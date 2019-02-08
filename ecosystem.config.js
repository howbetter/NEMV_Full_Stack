module.exports = {
  apps : [{
    name: 'nemv',
    // script: 'app.js',
    script: './be/bin/www',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    // args: 'one two',
    // instances: 1,
    // autorestart: true,
    // watch: false,  // 코드 변화 확인 후 재시작
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_prod: {
      NODE_ENV: 'production',
      PORT: 80
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      key : '',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/nemv',
      'post-deploy' : 'yarn pm2'
    }
  }
};
