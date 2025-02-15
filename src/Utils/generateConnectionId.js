
function generateConversationId(id1,id2) {
    const [p1,p2] = [id1, id2].sort();
    return `${p1}-${p2}`;
};

export default generateConversationId;