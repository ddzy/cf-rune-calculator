pipeline {
	agent any

	tools {
		nodejs 'NodeJS 24.18.0'
	}

	options {
		disableConcurrentBuilds()
	}

	parameters {
		booleanParam(
			name: 'DEPLOY',
			defaultValue: true,
			description: '构建成功后是否发布静态文件到服务器。首次构建请保持关闭。',
		)
	}

	environment {
		APP_NAME = 'cf-rune-calculator'
		DEPLOY_DIR = '/srv/cf-rune-calculator'
	}

	stages {
		stage('Verify toolchain') {
			steps {
				sh '''
					set -eu
					node --version
					pnpm --version
				'''
			}
		}

		stage('Install dependencies') {
			steps {
				sh 'pnpm install --frozen-lockfile'
			}
		}

		stage('Build') {
			steps {
				sh '''
					set -eu
					pnpm build
					test -f dist/index.html
				'''
			}
		}

		stage('Deploy') {
			when {
				expression { params.DEPLOY }
			}
			steps {
				sh '''
					set -eu
					sudo install -d -m 755 "$DEPLOY_DIR"
					sudo rm -rf "$DEPLOY_DIR"/*
					sudo cp -a "$WORKSPACE/dist/." "$DEPLOY_DIR/"
				'''
			}
		}
	}

	post {
		success {
			echo "${env.APP_NAME}: pipeline succeeded"
		}
		failure {
			echo "${env.APP_NAME}: pipeline failed"
		}
	}
}
