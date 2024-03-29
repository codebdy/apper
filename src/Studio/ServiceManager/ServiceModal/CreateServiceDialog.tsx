import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UpsertServiceModel } from './UpsertServiceModel';

export const CreateServiceDialog = memo(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t } = useTranslation();

  const showModal = () => {
    setIsModalVisible(true);
  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
        className="hover-float"
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        {t("ServiceManager.CreateService")}
      </Button>
      <UpsertServiceModel visible={isModalVisible} onClose={handleCancel} />
    </>
  );
});
