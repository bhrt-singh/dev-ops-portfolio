pipeline {

    agent any

    tools {
        nodejs 'node22'
    }

    stages {

        stage('Verify Tools') {
            steps {
                sh '''
                    echo "===== TOOLS ====="
                    node --version
                    npm --version
                    docker --version

                    echo "===== DOCKER ENV ====="
                    echo "DOCKER_HOST=$DOCKER_HOST"
                    echo "DOCKER_TLS_VERIFY=$DOCKER_TLS_VERIFY"
                    echo "DOCKER_CERT_PATH=$DOCKER_CERT_PATH"

                    echo "===== FIX DOCKER ENV ====="
                    export DOCKER_HOST=tcp://docker:2375
                    unset DOCKER_TLS_VERIFY
                    unset DOCKER_CERT_PATH

                    echo "DOCKER_HOST=$DOCKER_HOST"
                    echo "DOCKER_TLS_VERIFY=$DOCKER_TLS_VERIFY"
                    echo "DOCKER_CERT_PATH=$DOCKER_CERT_PATH"

                    docker version
                    docker ps
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    npm ci
                '''
            }
        }

        stage('Build Application') {
            steps {
                sh '''
                    npm run build
                '''
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    export DOCKER_HOST=tcp://docker:2375
                    unset DOCKER_TLS_VERIFY
                    unset DOCKER_CERT_PATH

                    docker build \
                        -t dev-ops-portfolio:${BUILD_NUMBER} \
                        .
                '''
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                    export DOCKER_HOST=tcp://docker:2375
                    unset DOCKER_TLS_VERIFY
                    unset DOCKER_CERT_PATH

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
                    export DOCKER_HOST=tcp://docker:2375
                    unset DOCKER_TLS_VERIFY
                    unset DOCKER_CERT_PATH

                    docker exec dev-ops-portfolio-test \
                        wget -qO- http://localhost
                '''
            }
        }
    }

    post {
        always {
            sh '''
                export DOCKER_HOST=tcp://docker:2375
                unset DOCKER_TLS_VERIFY
                unset DOCKER_CERT_PATH

                docker rm -f dev-ops-portfolio-test || true
            '''
        }
    }
}