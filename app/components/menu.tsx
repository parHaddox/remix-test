
export default function Menu(){
    return (
    <nav className="sticky top-0 z-40 flex flex-row items-center justify-center gap-4 bg-gray-200 dark:bg-gray-400">
        <ul className="flex gap-2">
        {resources.map(({ href, text, icon }) => (
            <li key={href}>
            <a
                className="group flex items-center gap-3 self-stretch p-3 leading-normal text-gray-600 hover:underline dark:text-gray-900"
                href={href} >
                {icon}
                {text}
            </a>
            </li>
        ))}
        </ul>
    </nav>)
}

const resources = [
    {
        href: "/",
        text: "Home",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
            className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-700"
            width="24"
            height="20">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
        ),
      },
      {
        href: "/photos",
        text: "Photos",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
            className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-700" 
            width="24"
            height="20">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
        ),
      },
  ];
  