const ChangeBoard = (props) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="32" {...props} height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"><path strokeLinejoin="round" d="M2 16c0 2.21 0 3.316.702 4.054q.169.178.37.327C3.908 21 5.16 21 7.667 21h.666c2.506 0 3.759 0 4.595-.62q.201-.147.37-.326C14 19.316 14 18.211 14 16c0-2.21 0-3.316-.702-4.054a3 3 0 0 0-.37-.327C12.092 11 10.84 11 8.333 11h-.666c-2.506 0-3.759 0-4.595.62a3 3 0 0 0-.37.326C2 12.684 2 13.789 2 16m8-8c0-2.21 0-3.316.702-4.054q.168-.178.37-.327C11.908 3 13.16 3 15.667 3h.666c2.506 0 3.759 0 4.595.62q.201.148.37.326C22 4.684 22 5.789 22 8c0 2.21 0 3.316-.702 4.054a3 3 0 0 1-.37.327c-.758.562-1.86.614-3.928.618" /><path d="M2 15h12m-4-8h12" /><path strokeLinejoin="round" d="M2 9c0-3.317 2.683-6 6-6l-.857 1.714M22 15c0 3.317-2.683 6-6 6l.857-1.714" /></g></svg>
}

const AddTaskCard = (props) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="32" {...props} height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M4 12h16V8H4zm15 10v-3h-3v-2h3v-3h2v3h3v2h-3v3zM4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v6h-3q-2.075 0-3.537 1.463T14 17v3z" /></svg>
}

const ChangeView = (props) => {
    return <svg xmlns="http://www.w3.org/2000/svg" {...props} width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M8.5 10.5H5q-.825 0-1.412-.587T3 8.5V5q0-.825.588-1.412T5 3h3.5q.825 0 1.413.588T10.5 5v3.5q0 .825-.587 1.413T8.5 10.5M5 8.5h3.5V5H5zM8.5 21H5q-.825 0-1.412-.587T3 19v-3.5q0-.825.588-1.412T5 13.5h3.5q.825 0 1.413.588T10.5 15.5V19q0 .825-.587 1.413T8.5 21M5 19h3.5v-3.5H5zm14-8.5h-3.5q-.825 0-1.412-.587T13.5 8.5V5q0-.825.588-1.412T15.5 3H19q.825 0 1.413.588T21 5v3.5q0 .825-.587 1.413T19 10.5m-3.5-2H19V5h-3.5zM19 21h-3.5q-.825 0-1.412-.587T13.5 19v-3.5q0-.825.588-1.412T15.5 13.5H19q.825 0 1.413.588T21 15.5V19q0 .825-.587 1.413T19 21m-3.5-2H19v-3.5h-3.5zm0-3.5" /></svg>
}

const GridIcon = (props) => {
    return <svg xmlns="http://www.w3.org/2000/svg" {...props} width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M5 3h13a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3m0 1a2 2 0 0 0-2 2v3h5V4zM3 19a2 2 0 0 0 2 2h3v-5H3zm5-9H3v5h5zm10 11a2 2 0 0 0 2-2v-3h-5v5zm2-11h-5v5h5zm0-4a2 2 0 0 0-2-2h-3v5h5zM9 4v5h5V4zm0 17h5v-5H9zm5-11H9v5h5z" /></svg>
}

const ListIcon = (props) => {
    return <svg xmlns="http://www.w3.org/2000/svg" {...props} width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M10 20q-.825 0-1.412-.587T8 18t.588-1.412T10 16h10q.825 0 1.413.588T22 18t-.587 1.413T20 20zm0-6q-.825 0-1.412-.587T8 12t.588-1.412T10 10h10q.825 0 1.413.588T22 12t-.587 1.413T20 14zm0-6q-.825 0-1.412-.587T8 6t.588-1.412T10 4h10q.825 0 1.413.588T22 6t-.587 1.413T20 8zM4 8q-.825 0-1.412-.587T2 6t.588-1.412T4 4t1.413.588T6 6t-.587 1.413T4 8m0 6q-.825 0-1.412-.587T2 12t.588-1.412T4 10t1.413.588T6 12t-.587 1.413T4 14m0 6q-.825 0-1.412-.587T2 18t.588-1.412T4 16t1.413.588T6 18t-.587 1.413T4 20" /></svg>
}

const AddCardIcon = (props) => {
    return <svg xmlns="http://www.w3.org/2000/svg" {...props} width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21q-.425 0-.712-.288T11 20v-7H4q-.425 0-.712-.288T3 12t.288-.712T4 11h7V4q0-.425.288-.712T12 3t.713.288T13 4v7h7q.425 0 .713.288T21 12t-.288.713T20 13h-7v7q0 .425-.288.713T12 21" /></svg>
}

const AddToListIcon = (props) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" {...props}><path fill="currentColor" fillRule="evenodd" d="M18.002 20.408a2.5 2.5 0 0 0 1.8-3.043l-.904-3.521a2.5 2.5 0 0 1-2.709-2.491V9.948h-1.404a2.5 2.5 0 1 1 0-5h1.405V3.543q0-.108.009-.215l-.175-.682a2.5 2.5 0 0 0-3.044-1.8L2.285 3.592a2.5 2.5 0 0 0-1.8 3.043l3.779 14.72a2.5 2.5 0 0 0 3.043 1.799zm.688-8.055a1 1 0 0 1-1-1V8.447h-2.905a1 1 0 1 1 0-2h2.905V3.543a1 1 0 1 1 2 0v2.904h2.904a1 1 0 1 1 0 2H19.69v2.906a1 1 0 0 1-1 1" clipRule="evenodd" /></svg>
}

const EditListItemIcon = (props) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M4 14v-2h7v2zm0-4V8h11v2zm0-4V4h11v2zm9 14v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.5 5.5zm6.575-5.6l.925-.975l-.925-.925l-.95.95z" /></svg>
}

const PencilIcon = (props) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z" /></svg>
}

const DeleteIcon = (props) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z" /></svg>
}

const EllipsisIcon = (props) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></g></svg>
}

const EllipsisVerticalIcon = (props) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></g></svg>
}

const CheckIcon = (props) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" /></svg>
}

const TickIcon = (props) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z" /></svg>
}

export { ChangeBoard, AddTaskCard, ChangeView, GridIcon, ListIcon, AddCardIcon, AddToListIcon, EditListItemIcon, PencilIcon, DeleteIcon, EllipsisIcon, EllipsisVerticalIcon, CheckIcon, TickIcon };