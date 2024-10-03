pipeline {
    agent any
    environment {
        VERSION = ""
        REPO = "chauminh1212/sirena"
        registryCredential = 'e53caa92-7791-4e02-9cd5-5f60554301fe'
    }
    stages {
        stage('Install jq') {
            steps {
                script {
                    // Cài đặt jq nếu chưa có
                    sh 'apt-get update && apt-get install -y jq'
                }
            }
        }
        stage('Check and Increment Tag') {
            steps {
                script {
                    // Lấy tag mới nhất từ Docker Hub
                    def tag = sh(script: "curl -s 'https://hub.docker.com/v2/repositories/${REPO}/tags/?page_size=1' | jq -r \'.results[].name\'", returnStdout: true).trim()
                    echo "Tag hiện tại là: ${tag}"
                    
                    // Split tag thành hai phần: major và minor
                    def parts = tag.split("\\.")
                    def major = parts[0].toInteger()
                    def minor = parts[1].toInteger()
                    
                    // Kiểm tra nếu minor = 9 thì tăng major và đặt minor = 0
                    if (minor == 9) {
                        major += 1
                        minor = 0
                    } else {
                        // Tăng minor nếu minor < 9
                        minor += 1
                    }
                    
                    // Tạo tag mới
                    def newTag = "${major}.${minor}"

                    // Gán giá trị cho biến môi trường VERSION
                    VERSION = newTag
                }
            }
        }
        stage('Build and deploy image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', registryCredential ) {
                        sh "docker build --platform linux/amd64  -t ${REPO}:${VERSION} ."
                        sh "docker push ${REPO}:${VERSION}"
                    }
                    echo "Complete!!!!"
                }
            }
        }
    }
} 
