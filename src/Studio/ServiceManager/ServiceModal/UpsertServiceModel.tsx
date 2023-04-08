import { useShowError } from "AppDesigner/hooks/useShowError";
import { Form, Input, message, Modal } from "antd"
import ImageUploader from "components/ImageUploader";
import { MultiLangInput } from "components/MultiLangInput";
import { useUpsertService } from "hooks/useUpsertService";
import { IService, IServiceInput } from "model/service";
import { useCallback, useEffect } from "react";
import { memo } from "react"
import { useTranslation } from "react-i18next";

export const UpsertServiceModel = memo((
  props: {
    service?: IService,
    visible?: boolean,
    onClose?: () => void,
  }
) => {
  const { service, visible, onClose } = props;
  const [form] = Form.useForm<IServiceInput>();
  const { t } = useTranslation();

  const reset = useCallback(() => {
    form.setFieldsValue({ name: service?.name || "", title: service?.title || "", imageUrl: service?.imageUrl || "" })
  }, [form, service?.name, service?.title, service?.imageUrl])

  useEffect(() => {
    reset();
  }, [form, reset])

  const [upsert, { loading, error }] = useUpsertService({
    onCompleted: () => {
      message.success(t("OperateSuccess"))
      onClose?.();
    }
  });

  useShowError(error);

  const handleOk = useCallback(() => {
    form.validateFields().then((formData) => {
      const { title, imageUrl, name } = formData;
      upsert({ title, imageUrl, name, id: service?.id })
      !service && reset();
    }).catch((err) => {
      console.error("form validate error", err);
    });
  }, [service, upsert, form, reset]);

  return (
    <Modal
      title={service ? t("ServiceManager.UpdateService") : t("ServiceManager.CreateService")}
      okText={t("Confirm")}
      cancelText={t("Cancel")}
      forceRender
      okButtonProps={{
        loading: loading
      }}
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
    >
      <Form
        name="createApp"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ title: "", description: "" }}
        form={form}
        autoComplete="off"
      >
        <Form.Item
          label={t("Name")}
          name="name"
          rules={[{ required: true, message: t("Required") }]}
        >
          <Input title={t("Name")} />
        </Form.Item>
        <Form.Item
          label={t("Title")}
          name="title"
          rules={[{ required: true, message: t("Required") }]}
        >
          <MultiLangInput inline title={t("Title")} />
        </Form.Item>
        < Form.Item
          label={t("Image")}
          name="imageUrl"
        >
          <ImageUploader title={t("Upload")} maxCount={1} />
        </Form.Item>
      </Form>
    </Modal>
  )
})