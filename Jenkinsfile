pipeline {
    agent { label 'master'}
    tools { nodejs "nodejs" }
    stages {
        stage('Build') {
            steps {
	            sh 'npm cache clean -f'
		    sh 'npm install'
		    sh 'npm run build'
            }
        }
	    stage('Sonarqube analysis') {
	    environment { 
	        scannerhome = tool 'sonarqube-scanner'
	    }
	    steps {
	        withSonarQubeEnv('sonarqube') {
	        sh "${scannerHome}/bin/sonar-scanner"
	        }
            }
	   }
	    stage ('Docker Build') {
	        steps {
	            sh "docker build -t revathilakshmanan/easyclaim-frontend:${env.BUILD_ID} ."
	        }
	    }
	   stage('Functional Testing') {
	    steps{
	            sh "docker run --name easyclaimtest -d -p 90:80 revathilakshmanan/easyclaim-frontend:${env.BUILD_ID}"
		    sh "pytest -v -s test_pytest.py"
	        }
	    }
	    stage('Pushing Docker Image to DockerHub') {
                steps {
                    script {
                        docker.withRegistry('https://registry.hub.docker.com', 'docker_credential') {
                            docker.image("revathilakshmanan/easyclaim-frontend:${env.BUILD_ID}").push()
                            docker.image("revathilakshmanan/easyclaim-frontend:${env.BUILD_ID}").push("latest")
                    }
                }
            }
        }
	    stage('Pushing artifacts to Artifactory') {
	    steps {
	        sh "zip -r buildArtifact${env.BUILD_ID}.zip dist"
                rtUpload (
                    serverId: 'central',
                    spec: '''{
                        "files": [
                            {
                                "pattern": "buildArtifact*.zip",
                                "target": "easyclaim-frontendapp/"
                            }
                        ]
                    }''',
                    buildName: "${env.JOB_NAME}",
                    buildNumber: "${env.BUILD_NUMBER}" 
                )
	    }
	}
	stage('Deloy to kubernets') {
		steps {
		    sh "ansible-playbook deploy-playbook.yml"	
		}
	}   
	
	}
  }       

