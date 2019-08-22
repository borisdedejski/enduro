using System;
using System.Collections.Generic;
using System.Text;

namespace Enduro.Core.Cars
{
    public class Comments 
    {
        public Guid UserId;
        public string FullName;
        public string Comment;
        public Guid CommentId;

        public Comments(Guid commentId,Guid userId, string fullName, string comment)
        {
            UserId = userId;
            FullName = fullName;
            Comment = comment;
            CommentId = commentId;
        }
    }
}
