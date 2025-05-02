import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData, useRouteError, isRouteErrorResponse } from '@remix-run/react'
import { useState } from 'react'

type PicSumData = {
    id: number;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url:string;
}

export async function loader(params: LoaderFunctionArgs) {
    const response = await fetch('https://picsum.photos/v2/list');
    const photos = await response.json();
    return json(photos);
}

export function ErrorBoundary() {
    const error = useRouteError();

    if(isRouteErrorResponse(error)){
        return (
            <div className="flex flex-col p-6">
                <h1 className="text-red-500 bold">{error.status} - {error.statusText}</h1>
                {error.data && <p>{error.data}</p>}
            </div>
        );
    } else if (error instanceof Error){
        return (
            <div className="flex flex-col p-6">
                <h1 className="text-red-500 bold">Error</h1>
                <p>{error.message}</p>
                <p>Stack Trace:</p>
                {error.stack && <pre>{error.stack}</pre>}
            </div>
        );
    } else {
        return (
            <div className="flex flex-col p-6">
                <h1 className="text-red-500 bold">Unknown Error</h1>
            </div>
        );
    }
}

export default function Photos(){
    const photos = useLoaderData<typeof loader>() as PicSumData[]
    const [photo, setPhoto] = useState<PicSumData | null>(null);
    
    return (
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 p-4" >
            {photos.map(photo => 
                <div key={photo.id} onClick={() => { setPhoto(photo) }} className="rounded overflow-hidden hover:scale-105 z-0 transition"> 
                    <img src={photo.download_url} alt={photo.author} className="w-full h-48 object-cover"/>
                </div>
            )}
            { photo && (
                <div className="fixed inset-0 z-50 p-4 flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-gray-300" onClick={() => { setPhoto(null)}}>
                    <span className="absolute top-2 right-2 text-gray-700 dark:text-gray-400 hover:text-gray-400 dark:hover:text-gray-600 cursor-pointer text-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </span>
                    <img src={photo.download_url} className="rounded overflow-hidden" />
                    <div className="p-4 rounded shadow w-full max-w-3xl">
                        <div className="grid grid-cols-2 gap-4">
                            <div>   
                                <div>   
                                    Author 
                                </div> 
                                <div>   
                                    Original Size 
                                </div> 
                                <div>   
                                    <span>Original Source </span>
                                </div> 
                                <div>   
                                    <span>Download Full Size </span>
                                </div> 
                            </div>
                            
                            <div> 
                                <div>   {photo.author} </div>
                                <div>   {photo.width} X {photo.height}</div>
                                <div onClick={(e) => e.stopPropagation()}>                              
                                    <a href={photo.url} className="underline text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">{photo.url}</a>
                                </div>
                                <div onClick={(e) => e.stopPropagation()}> 
                                    <a href={photo.download_url} className="underline text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">{photo.download_url}</a>
                                </div>
                            </div>
                        </div>
                    </div>
        
                </div>
            )}
        </div>)
}

