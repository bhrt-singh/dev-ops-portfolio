pipeline {

    agent any

    tools {
        nodejs 'NodeJS-22'
    }

    environment {
        DOCKER_HOST = 'tcp://docker:2375'
        DOCKER_TLS_VERIFY = ''
        DOCKER_CERT_PATH = ''
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Tools') {
            steps {
                sh '''
                    echo "Node:"
                    node --version

                    echo "npm:"
                    npm --version

                    echo "Docker:"
                    docker version
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build Application') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    docker build \
                        -t dev-ops-portfolio:${BUILD_NUMBER} \
                        .
                '''
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                    docker rm -f dev-ops-portfolio-test || true

                    docker run -d \
                        --name dev-ops-portfolio-test \
                        -p 8080:80 \
                        dev-ops-portfolio:${BUILD_NUMBER}
                '''
            }
        }

        stage('Test Container') {
            steps {
                sh '''
                    docker exec dev-ops-portfolio-test \
                        wget -qO- http://localhost
                '''
            }
        }
    }

    post {
        always {
            sh '''
                docker rm -f dev-ops-portfolio-test || true
            '''
        }
    }
}