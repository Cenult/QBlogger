
document
    .querySelector(".content")
    .addEventListener("click", async (e) => {
        e.preventDefault();
        if (e.target.dataset.blogid && e.target.classList.contains("post-comment")){
            console.log(e.target);

            try {
                const response = await fetch(`/blog/postComment/${e.target.dataset.blogid}`, {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({content:e.target.parentElement.querySelector("#comment-content").value})
                    
                })
                const data = await response.json();
                if (data.id){
                    e.target.parentElement.querySelector(".success").textContent = "Comment posted succesfully";

                    const commentsNew = e.target.parentElement.parentElement.querySelector(".comments");
                    commentsNew.innerText = "";

                    try {
                        const response = await fetch(`/blog/getComment/${e.target.dataset.blogid}`, {
                            method: "GET",
                            headers:{
                                "Content-Type": "application/json"
                            }
                        })
                        const data = await response.json();
                        console.log(data);
                        
                        if (data.errors){
                            console.log(data.errors);
                        }
                        
                        
                        if (data.comments){
                            for (let comment of data.comments){
                                const spanUsername = document.createElement("span");
                                spanUsername.classList.add("comment","username");
                                spanUsername.innerText = comment.username;
                                console.log(comment);
    
                                
                                const divComment = document.createElement("div");
                                divComment.classList.add("comment","content");
                                divComment.innerText = comment.content;
                                
    
                                const divCommentContainer = document.createElement("div");
                                divCommentContainer.classList.add("comment-container");
    
                                divCommentContainer.appendChild(spanUsername);
                                divCommentContainer.appendChild(divComment);
    
                                commentsNew.appendChild(divCommentContainer);
                            }
                            e.target.parentElement.parentElement.querySelector(".comments-container").appendChild(commentsNew);
                        }
    
                    } catch (error){
                        console.log(error);
                    }
                }
                if (data.errors){
                    e.target.parentElement.querySelector(".error").textContent = data.errors.content;
                }
                console.log(data);
            }
            catch (error){
                console.log(error);
            }


        } else if (e.target.dataset.blogid) {
            e.target.classList.toggle("active");
            if (!e.target.classList.contains("comment")) {
                const voteCount = parseInt(e.target.querySelector(
                                    "span"
                                ).textContent);
                console.log("Vote Count:",voteCount);
                try {
                    const response = await fetch(
                        "/updateVote",
                        {
                            method: "PUT",
                            body: JSON.stringify({
                                count:voteCount , update: e.target.dataset.update, blogid: e.target.dataset.blogid
                            }),
                            headers: {
                                "Content-Type":
                                    "application/json",
                            }
                        }
                    );
                    const data =  await response.json();
                    console.log(data);
                    if (data.errors){
                        console.log(data);
                    } else {
                        e.target.querySelector(
                                    "span"
                                ).textContent = data[e.target.dataset.update+"s"];
                                console.log(data[e.target.dataset.update+"s"]);
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log(e.target);
                const comments = e.target.parentElement.parentElement.querySelector(".comments");
                if (!comments){
                    e.target.parentElement.parentElement.querySelector(".comment-section").classList.remove("hidden");
                    const commentsNew = document.createElement("div");
                    commentsNew.classList.add("comments");

                    

                    try {
                        const response = await fetch(`/blog/getComment/${e.target.dataset.blogid}`, {
                            method: "GET",
                            headers:{
                                "Content-Type": "application/json"
                            }
                        })
                        const data = await response.json();
                        console.log(data);
                        
                        if (data.errors){
                            console.log(data.errors);
                        }
                        
    
                        if (data.comments){
                            for (let comment of data.comments){
                                const spanUsername = document.createElement("span");
                                spanUsername.classList.add("comment","username");
                                spanUsername.innerText = comment.username;
                                console.log(comment);
    
                                
                                const divComment = document.createElement("div");
                                divComment.classList.add("comment","content");
                                divComment.innerText = comment.content;
                                
    
                                const divCommentContainer = document.createElement("div");
                                divCommentContainer.classList.add("comment-container");
    
                                divCommentContainer.appendChild(spanUsername);
                                divCommentContainer.appendChild(divComment);
    
                                commentsNew.appendChild(divCommentContainer);
                            }
                            e.target.parentElement.parentElement.querySelector(".comments-container").appendChild(commentsNew);
                        }
    
                    } catch (error){
                        console.log(error);
                    }

                } else {
                    comments.remove();
                    e.target.parentElement.parentElement.querySelector(".comment-section").classList.add("hidden");
                }
                
                    

            }

            
        } else if (e.target.parentElement.dataset.blogid) {
            e.target.parentElement.classList.toggle("active");

            if (!e.target.parentElement.classList.contains("comment")) {
                const voteCount = parseInt(e.target.parentElement.querySelector(
                                    "span"
                                ).textContent);
                console.log("Vote Count:",voteCount);
                try {
                    const response = await fetch(
                        "/updateVote",
                        {
                            method: "PUT",
                            body: JSON.stringify({
                                count:voteCount , update: e.target.parentElement.dataset.update, blogid: e.target.parentElement.dataset.blogid
                            }),
                            headers: {
                                "Content-Type":
                                    "application/json",
                            }
                        }
                    );
                    const data = await response.json();
                   
                        
                    if (data.errors){
                        console.log(data);
                    } else {
                        e.target.parentElement.querySelector(
                                    "span"
                                ).textContent = data[e.target.parentElement.dataset.update+"s"];
                        console.log(data[e.target.parentElement.dataset.update+"s"]);
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log(e.target.parentElement);

                const comments = e.target.parentElement.parentElement.parentElement.querySelector(".comments");
                if (!comments){
                    e.target.parentElement.parentElement.parentElement.querySelector(".comment-section").classList.remove("hidden");

                    const commentsNew = document.createElement("div");
                    commentsNew.classList.add("comments");

                    try {
                        const response = await fetch(`/blog/getComment/${e.target.parentElement.dataset.blogid}`, {
                            method: "GET",
                            headers:{
                                "Content-Type": "application/json"
                            }
                        })
                        const data = await response.json();
                        console.log("data: ",data);
                        
                        if (data.errors){
                            console.log(data.errors);
                        }
                        
    
                        if (data.comments){
                            for (let comment of data.comments){
                                const spanUsername = document.createElement("span");
                                spanUsername.classList.add("comment","username");
                                spanUsername.innerText = comment.username;
                                console.log(comment);
    
                                
                                const divComment = document.createElement("div");
                                divComment.classList.add("comment","content");
                                divComment.innerText = comment.content;
                                
    
                                const divCommentContainer = document.createElement("div");
                                divCommentContainer.classList.add("comment-container");
    
                                divCommentContainer.appendChild(spanUsername);
                                divCommentContainer.appendChild(divComment);
    
                                commentsNew.appendChild(divCommentContainer);
                            }
                            e.target.parentElement.parentElement.parentElement.querySelector(".comments-container").appendChild(commentsNew);
                        }
    
                    } catch (error){
                        console.log(error);
                    }

                } else {
                    comments.remove();
                    e.target.parentElement.parentElement.parentElement.querySelector(".comment-section").classList.add("hidden");
                }
            }
            

        } 
    });
