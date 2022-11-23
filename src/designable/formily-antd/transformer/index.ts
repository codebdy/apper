import { ISchema, Schema } from '@formily/json-schema'
import { ITreeNode } from 'designable/core'
import { clone, uid } from 'designable/shared'

export interface ITransformerOptions {
  designableFieldName?: string
  designableRootName?: string
}

export interface IFormilySchema {
  schema?: ISchema
  form?: Record<string, any>
}

const createOptions = (options?: ITransformerOptions): ITransformerOptions => {
  return {
    designableFieldName: 'Field',
    designableRootName: 'RootComponent',
    ...options,
  }
}

const findNode = (node: ITreeNode, finder?: (node: ITreeNode) => boolean) => {
  if (!node) return
  if (finder && finder(node)) return node
  if (!node.children) return
  for (let i = 0; i < node.children.length; i++) {
    if (findNode(node.children[i])) return node.children[i]
  }
  return
}

export const transformToSchema = (
  node: ITreeNode,
  options?: ITransformerOptions
): IFormilySchema => {
  const realOptions = createOptions(options)
  const root = findNode(node, (child) => {
    return child.componentName === realOptions.designableRootName
  })
  const schema = {
    type: 'object',
    properties: {},
  }
  if (!root) return { schema }
  const createSchema = (node: ITreeNode, schema: ISchema = {}) => {
    if (node !== root) {
      Object.assign(schema, clone(node.props))
    }
    schema['x-designable-id'] = node.id
    if (schema.type === 'array') {
      if (node.children?.[0]) {
        if (
          node.children[0].componentName === realOptions.designableFieldName
        ) {
          schema.items = createSchema(node.children[0])
          schema['x-index'] = 0
        }
      }
      node.children?.slice(1).forEach((child, index) => {
        if (child.componentName !== realOptions.designableFieldName) return
        const key = child.props?.name || child.id
        schema.properties = schema.properties || {} as any
        (schema.properties as any)[key] = createSchema(child) as any
        (schema.properties as any)[key]['x-index'] = index
      })
    } else {
      node.children?.forEach((child, index) => {
        if (child.componentName !== realOptions.designableFieldName) return
        const key = child.props?.name || child.id
        schema.properties = schema.properties || {} as any
        (schema.properties as any)[key] = createSchema(child) as any
        (schema.properties as any)[key]['x-index'] = index
      })
    }
    return schema
  }
  return { form: clone(root.props), schema: createSchema(root, schema) }
}

export const transformToTreeNode = (
  formily: IFormilySchema = {},
  options?: ITransformerOptions
) => {
  const realOptions = createOptions(options)
  const root: ITreeNode = {
    componentName: realOptions.designableRootName,
    props: formily.form,
    children: [],
  }
  const schema = new Schema(formily.schema as any)
  const cleanProps = (props: any) => {
    if (props['name'] === props['x-designable-id']) {
      delete props.name
    }
    delete props['version']
    delete props['_isJSONSchemaObject']
    return props
  }
  const appendTreeNode = (parent: ITreeNode, schema: Schema) => {
    if (!schema) return
    const current = {
      id: schema['x-designable-id'] || uid(),
      componentName: realOptions.designableFieldName,
      props: cleanProps(schema.toJSON(false)),
      children: [],
    }
    parent.children?.push(current)
    if (schema.items && !Array.isArray(schema.items)) {
      appendTreeNode(current, schema.items)
    }
    schema.mapProperties((schema) => {
      schema['x-designable-id'] = schema['x-designable-id'] || uid()
      appendTreeNode(current, schema)
    })
  }
  schema.mapProperties((schema) => {
    schema['x-designable-id'] = schema['x-designable-id'] || uid()
    appendTreeNode(root, schema)
  })
  return root
}
