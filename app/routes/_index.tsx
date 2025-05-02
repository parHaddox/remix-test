import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Ligonier Code Challenge – Chris Haddox" },
    { name: "description", content: "Code challenge submission by Chris Haddox, demonstrating Remix.js and React fundamentals." },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen justify-center">
      <div className="flex flex-col items-center gap-16">
        <div className="prose dark:prose-invert mx-auto p-6">
          <h1>Dev Journey - Remix Code Challenge</h1>

          <p className="italic">
            These are unfiltered dev notes written while building the code challenge. To view the project in action, head over to the <a href="/photos" className="underline text-blue-600 hover:text-blue-800">Photos</a> page.
          </p>

          <h2>April 18, 2025</h2>

          <p><strong>Goal:</strong> The objective of this code challenge project is to fetch data from <a href="https://picsum.photos/v2/list"  target="_blank" rel="noopener noreferrer">https://picsum.photos/v2/list</a> in Remix JS (React) or a React Native application and display a list of images. When an image is clicked, a local notification or alert should be triggered, displaying the author's name.</p>

          <h3>Setup</h3>

          <p>create the project using a default template:</p>

          <pre>
            <code>npx create-remix@latest</code>
          </pre>

          <h3>Review the data</h3>

          <p>The data is an array of the following JSON objects:</p>

          <pre>
            <code>
{`{
  "id": "0",
  "author": "Alejandro Escamilla",
  "width": 5000,
  "height": 3333,
  "url": "https://unsplash.com/photos/yC-Yzbqy7PY",
  "download_url": "https://picsum.photos/id/0/5000/3333"
}`}
            </code>
          </pre>

          <h3>Brainstorm what kind of design/layout</h3>

          <p>At this point I want to determine: "how I want my end result to look?" I'm competing against others so let’s make sure it sticks out and lets document the process to give more insight to the team</p>

          <p>I am checking out what these photos are in the browser. I am noticing different sizes listed in the JSON – do I want them listed uniformly or do I want them in more of a collage? One URL links to the original source page with additional information, the other URL provides just the image. I find that the download URL can be manipulated to return the image in a specific size, and that it will return the photo in an aspect ratio different than the original image.</p>

          <p>With this information I have some ideas about cropping a square section of each photo into a grid of cards. I like the idea of the card having some animation on mouseover, maybe showing the image in its original aspect ratio. When clicked the image will open a modal that will include the requested information.</p>

          <p>Let’s start by retrieving the data in a loader and simply displaying each in a div – I can come back later after seeing the different sizes and image content to make further decisions and should give me a better idea of how my vision will actually look.</p>

          <h3>Phase 1</h3>

          <p>Let’s delete most of the contents from _index.tsx, set up the loader to retrieve the data. Here is what we've got so far, it's rough, but now I see what we are working with:</p>

          <pre>
            <code>
{`
import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData} from '@remix-run/react'

type picsum = {
  id: number;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export async function loader(params: LoaderFunctionArgs) {
  const response = await fetch('https://picsum.photos/v2/list');
  const data = await response.json();
  return json(data);
}

export default function Index() {
  const photos = useLoaderData<typeof loader>() as picsum[];

  return (
    <div>
      <div>
        <header>
          <h1>Ligonier Code Challenge</h1>
        </header>
      </div>
      <div>
        {photos.map((photo) => (
          <div key={photo.id}>
            <img src={photo.download_url} alt={photo.author} className="max-w-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}`}
            </code>
          </pre>

          <p>We can now see all the images we are retrieving, but this is pretty terrible looking.</p>

          <h3>Phase 2</h3>

          <p> Let's put "menu" and "photos" in their own component. Move menu to root as part of the layout. Update index to serve these development. Display photos in a responsive grid with an appealing zoom transition. When a photo is clicked, display it in a modal along with the author, original size and links to the original source and the download link.</p> 
          
          <pre>
            <code>
              
{`import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData} from '@remix-run/react'
import { useState } from 'react'

type PicSumPhoto = {
  id: number;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export async function loader() {
  const response = await fetch('https://picsum.photos/v2/list');
  const pics = await response.json();
    
  return json(pics);
}

export default function Photos() {
  const pics = useLoaderData<typeof loader>() as PicSumPhoto[];
  const [photo, setPhoto] = useState<PicSumPhoto | null>(null);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 p-4">
    { pics.map((photo) => 
      <div key={photo.id} className="rounded overflow-hidden hover:scale-105 transition"
        onClick={() => setPhoto(photo)}>
        <img src={photo.download_url} className="w-full h-48 object-cover"/>
      </div>
    )}
    {photo && 
        (<div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 overflow-auto bg-white bg-opacity-75 text-stone-950" onClick={(()=> setPhoto(null))}>
            <img src={photo?.download_url} />
            <div>{photo?.author}</div>
            <div>{photo?.width} x {photo?.height}</div>
            <div onClick={(e) => e.stopPropagation()}>
                <a href={photo?.download_url} target="_blank" rel="noopener noreferrer">download full size image</a>
            </div>
            <div onClick={(e) => e.stopPropagation()}>
                <a href={photo?.url} target="_blank" rel="noopener noreferrer">original image source</a>
            </div>
        </div>)}            
    </div>)
}`}
            </code>
          </pre>
          
          <p> I referred to the following webpages to remind myself how to set up the responsive grid layout and to update the menu icons:</p>

          <ul>
            <li><a href="https://tailwindcss.com/docs/grid-template-columns" target="_blank" rel="noopener noreferrer">Tailwind Grid Columns</a></li>
            <li><a href="https://www.w3schools.com/cssref/func_repeat.php" target="_blank" rel="noopener noreferrer">CSS repeat()</a></li>
            <li><a href="https://www.w3schools.com/cssref/func_minmax.php" target="_blank" rel="noopener noreferrer">CSS minmax()</a></li>
            <li><a href="https://heroicons.com/" target="_blank" rel="noopener noreferrer">Heroicons</a></li>
          </ul>

          <h2>April 19 – April 20, 2025</h2>

          <p>Happy Passover, Feast of Unleavened Bread and Feast of First Fruits!</p>

          <h2>April 21, 2025</h2>

          <h3>Phase 3</h3>

          <p>Jumping back to this after a weekend full of family, friends and worship. We left off with a functionally correct proof of concept. Today I want to display the photo details in the modal in a better layout, add error handling, add some styling for text and links, expand on the existing dark/light theme that comes in the default template, add a couple breadcrumbs and add my notes.</p>
          
          <p>During the styling updates and adding notes, I fixed some typos, changed some object names and updated the meta tags and favicon. I also decided to make the menu sticky in the case of small screen sizes.</p>

          <p>Handling errors has changed in Remix V2. CatchBoundary is no longer used and additional classes were added with combine to ErrorBoundary. I referred to the official docs for a refence:</p>
          <ul>
            <li><a href="https://remix.run/docs/en/main/route/error-boundary" target="_blank" rel="noopener noreferrer">Remix V2 ErrorBoundary</a></li>
          </ul>
          <p>
            Error handling was manually tested after development by simulating expected errors, unexpected exceptions, and unknown error types. The following test cases were used to validate the ErrorBoundary behavior:
          </p>
          <pre>
            <code>
              { 
`throw new Response("Not found", { status: 404, statusText: "Not Found" });
throw new Error("Something went terribly wrong");
throw 100`
              }
            </code>
          </pre>

          <p>To avoid spending too much time styling my dev notes, I decided to utilize prose from @tailwindcss/typography</p>
          <pre>
            <code>
              { 
                `npm install @tailwindcss/typography`
              }
            </code>
          </pre>

          <p>Favicon courtesy of Ligonier Ministries for the purposes of this code challenge</p>
          <ul>
            <li><a href="https://careers.ligonier.org/favicon-light.png" target="_blank" rel="noopener noreferrer">Ligonier Careers Favicon</a></li>
          </ul>

          <h3 className="italic">In Closing</h3>
          <p>
            I recognize there’s still room for improvement, like refactoring the Photos component to make it testable and adding some proper tests. For this challenge, I focused on delivering a solid and complete proof of concept, but I’d be glad to explore those enhancements further. I imagine that might be something we’ll get into during the live working session.
          </p>

          <p>
            Thank you for taking the time to review my code challenge submission and consider me for the opportunity to work with Ligonier Ministries. I'm really excited about the possibility of contributing to such a faithful and impactful organization. I would be honored to use my skills to support the work God is doing through your team.
          </p>

          <p className="italic">
            - Chris Haddox
          </p>

        </div>
      </div>
    </div>
  );
}
