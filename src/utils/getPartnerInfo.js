 const getPartnerInfo =(participants,loggedInUserEmail)=>{

    const partners =participants.find(participant=>participant.email !==loggedInUserEmail);
    return partners;
};
export default getPartnerInfo


// export default function getPartnerInfo(users, loggedInUserEmail) {
//     return users.filter((user) => user.email !== loggedInUserEmail);
// }
