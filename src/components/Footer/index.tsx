import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'yqx',
          title: '易启学',
          href: 'http://yqx.jiusi.cc',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/94java/yqx-backend-ui',
          blankTarget: true,
        },
        {
          key: 'Gitee',
          title: 'Gitee',
          href: 'https://gitee.com/java_94/yqx-backend-ui',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
