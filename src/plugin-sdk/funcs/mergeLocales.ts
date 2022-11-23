import _ from "lodash"

export function mergeLocalesWithCreate(source: any, target:any):any{
  const temp = _.merge({}, target)
  _.merge(temp, source)
  return temp
}