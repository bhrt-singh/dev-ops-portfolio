pipeline {

    agent any

    environment {
        DOCKER_HOST = 'tcp://docker:2375'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
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