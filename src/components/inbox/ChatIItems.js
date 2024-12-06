import { useSelector } from "react-redux";
import ChatItem from "./ChatItem";
import { Link } from "react-router-dom";


import Error from "../ui/Error";
import { useGetConversationsQuery } from "../../features/conversations/conversationsApi";

export default function ChatItems() {

    const { user } = useSelector((state) => state.auth) || {};
    const { email } = user || {};
    console.log(email)
    const {
        data: conversations,
        isLoading,
        isError,
        error,
    } = useGetConversationsQuery(email,{refetchOnMount:true})
    console.log(conversations)

   
    //what to render
    let content =null;
    if (isLoading) {
        content = <li className="m-2 text-center">Loading...</li>;
    } else if (!isLoading && isError) {
        content = (
            <li className="m-2 text-center">
                 <Error message={error?.data} />
            </li>
        );
    } else if (!isLoading && !isError && conversations?.length === 0) {
        content = <li className="m-2 text-center">No conversations found!</li>;
    }


    content = conversations?.map((conversation) => {
       
       

        return (
            <li key={conversation.id}>
                <Link to={`/inbox/${conversation.id}`}>
                <ChatItem
                    avatar="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
                    name="Saad Hasan"
                    lastMessage="bye"
                    lastTime="25 minutes"
                />
                </Link>
            </li>
        );
    });
    return <ul>{content}</ul>;
    // return <ul>ol</ul>;
}



    // return (
    //     <ul>
    //         <li>
                // <ChatItem
                //     avatar="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
                //     name="Saad Hasan"
                //     lastMessage="bye"
                //     lastTime="25 minutes"
                // />
    //             <ChatItem
    //                 avatar="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
    //                 name="Sumit Saha"
    //                 lastMessage="will talk to you later"
    //                 lastTime="10 minutes"
    //             />
    //             <ChatItem
    //                 avatar="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
    //                 name="Mehedi Hasan"
    //                 lastMessage="thanks for your support"
    //                 lastTime="15 minutes"
    //             />
    //         </li>
    //     </ul>
    // );
// }
