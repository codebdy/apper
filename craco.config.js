import { theme } from 'antd';
import { convertLegacyToken } from '@ant-design/compatible';

const { defaultAlgorithm, defaultSeed } = theme;

const mapToken = defaultAlgorithm(defaultSeed);
const v4Token = convertLegacyToken(mapToken);
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: v4Token,
          },
        },
      },
    },
  ],
};