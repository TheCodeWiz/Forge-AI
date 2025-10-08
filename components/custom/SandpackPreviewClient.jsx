import { ActionContext } from '@/context/ActionContext';
import { SandpackPreview, useSandpack } from '@codesandbox/sandpack-react'
import React, { useContext, useEffect, useRef } from 'react'

function SandpackPreviewClient() {
    const previewRef = useRef();
    const { sandpack } = useSandpack();
    const {action, setAction} = useContext(ActionContext);

    useEffect(() => {
        GetSandpackClient();
    },[sandpack && action])
 
    const GetSandpackClient = async () => {
        const client = previewRef.current?.getClient();
        if(client){
            console.log(client)
            const result = await client.getCodeSandboxURL();
            console.log(result)
            if(action?.actionType == 'deploy'){
                console.log(result?.sandboxId);
                const sandboxurl = 'https://'+result?.sandboxId+'.csb.app/'
                // Open in new tab with proper window features to ensure it loads correctly
                const newWindow = window.open(sandboxurl, '_blank', 'noopener,noreferrer');
                // Ensure the new window loads properly
                if (newWindow) {
                    newWindow.focus();
                }
            }
            else if(action?.actionType == 'export'){
                window?.open(result?.editorUrl)
            }
        }
    }
    return (
        <SandpackPreview style={{height:'78vh'}} showNavigator={true} ref={previewRef} />
    )
}

export default SandpackPreviewClient