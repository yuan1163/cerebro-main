## Deployment Steps

1. Verify the SSH server connection.

```bash
ssh ${SSH_SERVER} -p ${SSH_PORT} -l ${USERNAME}
```

2. Clean up the local 'home/yourName' directory.

```bash
ll
ll ${DEPLOYMENT_PATH}/dist # check the contents of the folder
rm -f -r *
exit
```

3. In the current branch of the repository, delete the 'dist' folder and create a new build.

```bash
dist # delete the dist folder
yarn build
```

4. Copy the new build to the home folder (in another terminal).

```bash
scp -P ${SSH_PORT} -r ${BUILD_PATH} ${USERNAME}@${SSH_SERVER}:/home/${USERNAME}
```

Example output:

```bash
hero-illustration.30a949d4.svg 100%  144KB 183.9KB/s   00:00
index.ab5f9270.js 100% 6321KB 413.9KB/s   00:15
index.da9a596e.css 100%  924KB 264.6KB/s   00:03
Inter.var.85f08b5f.woff2 100%
```

5. Connect to the SSH server again and clean the home folder.

```bash
ssh ${SSH_SERVER} -p ${SSH_PORT} -l ${USERNAME}
```

6. Clear deployment folder.

```bash
sudo rm -r ${DEPLOYMENT_PATH}/*
```

7. Copy the new build from the home folder to the deployment folder.

```bash
sudo cp -r dist/* ${DEPLOYMENT_PATH}
```

8. Clean the home folder and disconnect.

```bash
rm -r *
exit
```

9. Test the deployment.

```bash
https://${SSH_SERVER}/
```
