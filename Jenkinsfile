
pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Node.js') {
            steps {
                sh '''
                    node --version
                    npm --version
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build Docusaurus') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy Website') {
            steps {
                sh '''
                    test -d build
                    test -f build/index.html
                    rsync -rlv --delete build/ /var/www/html/
                '''
            }
        }
    }

    post {
        success {
            echo 'Docusaurus site built and deployed successfully.'
        }
        failure {
            echo 'Pipeline failed. Check the stage logs above.'
        }
    }
}
