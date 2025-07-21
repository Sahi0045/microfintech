import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const DocumentManager = ({ documents, onUpload, onDelete, onShare }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const documentTypes = [
    { id: 'identity', label: 'Identity Documents', icon: 'User', color: 'text-blue-600' },
    { id: 'business', label: 'Business Documents', icon: 'Building', color: 'text-green-600' },
    { id: 'financial', label: 'Financial Records', icon: 'DollarSign', color: 'text-purple-600' },
    { id: 'legal', label: 'Legal Documents', icon: 'Scale', color: 'text-orange-600' }
  ];

  const getDocumentIcon = (type) => {
    switch (type) {
      case 'pdf': return 'FileText';
      case 'image': return 'Image';
      case 'video': return 'Video';
      default: return 'File';
    }
  };

  const getDocumentColor = (type) => {
    switch (type) {
      case 'pdf': return 'text-red-600';
      case 'image': return 'text-green-600';
      case 'video': return 'text-blue-600';
      default: return 'text-muted-foreground';
    }
  };

  const handleFileUpload = async (event, category) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        setUploadProgress(progress);
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Mock IPFS hash
      const mockHash = `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
      
      const newDocument = {
        id: Date.now() + i,
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : file.type === 'application/pdf' ? 'pdf' : 'file',
        size: file.size,
        category,
        uploadDate: new Date().toISOString(),
        ipfsHash: mockHash,
        url: URL.createObjectURL(file),
        verified: false
      };

      onUpload(newDocument);
    }

    setIsUploading(false);
    setUploadProgress(0);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const copyIPFSHash = (hash) => {
    navigator.clipboard.writeText(hash);
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Document Management</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {documentTypes.map((type) => (
            <div key={type.id} className="relative">
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={(e) => handleFileUpload(e, type.id)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isUploading}
              />
              <div className="flex flex-col items-center p-6 border-2 border-dashed border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-smooth">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-3">
                  <Icon name={type.icon} size={24} className={type.color} />
                </div>
                <span className="text-sm font-medium text-foreground text-center">{type.label}</span>
                <span className="text-xs text-muted-foreground mt-1">Click to upload</span>
              </div>
            </div>
          ))}
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center space-x-3">
              <Icon name="Upload" size={20} className="text-primary" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">Uploading to IPFS...</span>
                  <span className="text-sm text-primary">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Documents by Category */}
      {documentTypes.map((category) => {
        const categoryDocs = documents.filter(doc => doc.category === category.id);
        
        if (categoryDocs.length === 0) return null;

        return (
          <div key={category.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                <Icon name={category.icon} size={16} className={category.color} />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{category.label}</h3>
              <span className="text-sm text-muted-foreground">({categoryDocs.length})</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {categoryDocs.map((document) => (
                <div key={document.id} className="flex items-center space-x-4 p-4 bg-muted rounded-lg border border-border">
                  {/* Document Preview */}
                  <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center flex-shrink-0">
                    {document.type === 'image' ? (
                      <Image
                        src={document.url}
                        alt={document.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <Icon
                        name={getDocumentIcon(document.type)}
                        size={20}
                        className={getDocumentColor(document.type)}
                      />
                    )}
                  </div>

                  {/* Document Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-foreground truncate">{document.name}</h4>
                      {document.verified && (
                        <Icon name="Shield" size={14} className="text-success" />
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{formatFileSize(document.size)}</span>
                      <span>•</span>
                      <span>{new Date(document.uploadDate).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1 mt-2">
                      <Icon name="Link" size={12} className="text-muted-foreground" />
                      <button
                        onClick={() => copyIPFSHash(document.ipfsHash)}
                        className="text-xs font-mono text-primary hover:text-primary/80 transition-smooth"
                      >
                        {document.ipfsHash.slice(0, 12)}...
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Eye"
                      onClick={() => setSelectedDocument(document)}
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Share"
                      onClick={() => onShare(document)}
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Trash2"
                      onClick={() => onDelete(document.id)}
                      className="text-destructive hover:text-destructive"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Document Viewer Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">{selectedDocument.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setSelectedDocument(null)}
              />
            </div>
            
            <div className="p-4 max-h-[70vh] overflow-auto">
              {selectedDocument.type === 'image' ? (
                <Image
                  src={selectedDocument.url}
                  alt={selectedDocument.name}
                  className="max-w-full h-auto"
                />
              ) : selectedDocument.type === 'pdf' ? (
                <iframe
                  src={selectedDocument.url}
                  className="w-full h-96"
                  title={selectedDocument.name}
                />
              ) : (
                <div className="text-center py-12">
                  <Icon name="File" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Preview not available for this file type</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => window.open(selectedDocument.url, '_blank')}
                  >
                    Download File
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManager;