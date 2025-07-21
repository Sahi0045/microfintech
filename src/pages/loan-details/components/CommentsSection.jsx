import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const CommentsSection = ({ comments: initialComments, onAddComment }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const comment = {
        id: Date.now(),
        author: "Current User",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        content: newComment,
        timestamp: new Date(),
        verified: true,
        replies: []
      };
      
      setComments([comment, ...comments]);
      setNewComment('');
      setIsSubmitting(false);
      
      if (onAddComment) {
        onAddComment(comment);
      }
    }, 1000);
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
        <Icon name="MessageCircle" size={20} />
        <span>Questions & Answers</span>
        <span className="text-sm text-muted-foreground">({comments.length})</span>
      </h3>
      
      {/* Add Comment Form */}
      <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
        <Input
          label="Ask a question"
          type="text"
          placeholder="Ask the borrower about their business, repayment plan, or any concerns..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          description="Your question will be posted publicly and verified on-chain"
        />
        <Button
          variant="default"
          onClick={handleSubmitComment}
          disabled={!newComment.trim() || isSubmitting}
          loading={isSubmitting}
          iconName="Send"
          iconPosition="left"
        >
          Post Question
        </Button>
      </div>
      
      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="MessageCircle" size={48} className="mx-auto mb-2 opacity-50" />
            <p>No questions yet. Be the first to ask!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="space-y-3 p-4 bg-muted/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <Image
                    src={comment.avatar}
                    alt={comment.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {comment.verified && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="Check" size={8} color="white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">{comment.author}</span>
                    {comment.verified && (
                      <Icon name="Shield" size={14} className="text-primary" />
                    )}
                    <span className="text-sm text-muted-foreground">
                      {formatTimestamp(comment.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-foreground">{comment.content}</p>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-smooth">
                      <Icon name="ThumbsUp" size={14} />
                      <span>Helpful</span>
                    </button>
                    <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-smooth">
                      <Icon name="MessageCircle" size={14} />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-12 space-y-3">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex items-start space-x-3 p-3 bg-card rounded-lg">
                      <Image
                        src={reply.avatar}
                        alt={reply.author}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-foreground text-sm">{reply.author}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(reply.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-foreground">{reply.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsSection;