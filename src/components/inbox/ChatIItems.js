import { useSelector } from "react-redux";
import ChatItem from "./ChatItem";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import Error from "../ui/Error";
import { useGetConversationsQuery } from "../../features/conversations/conversationsApi";
import getPartnerInfo from "../../utils/getPartnerInfo";
import gravatarUrl from "gravatar-url";

export default function ChatItems() {

    const { user } = useSelector((state) => state.auth) || {};
    const { email } = user || {};
    // console.log(email)
    const {
        data: conversations,
        isLoading,
        isError,
        error,
    } = useGetConversationsQuery(email)
    console.log(conversations)


   
    //todo:what to render
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
    else if (!isLoading && !isError && conversations?.length > 0) {
        content = conversations.map((conversation) => {
            const { id, message, timestamp } = conversation;
            const { email } = user || {};
            const { name,email:partnerEmail } = getPartnerInfo(
                conversation.users,
                email
            );

            console.log(id)
            console.log(`Navigating to /inbox/${id}`);


            return (
                
                <li key={id}>
                    <Link to={`/inbox/${id}`}>
                    
                        <ChatItem
                            avatar={gravatarUrl(partnerEmail, {
                                size: 80,
                            })}
                            // avatar="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
                            name={name}
                            lastMessage={message}
                            lastTime={moment(timestamp).fromNow()}
                        />
                    </Link>
                </li>
            );
        });
    }
        
    // finally return which conversation will render
    return <ul>{content}</ul>;
    
}


