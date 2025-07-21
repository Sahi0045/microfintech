import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentViewer = ({ documents }) => {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const getDocumentIcon = (type) => {
    switch (type) {
      case 'pdf':
        return 'FileText';
      case 'image':
        return 'Image';
      case 'spreadsheet':
        return 'FileSpreadsheet';
      default:
        return 'File';
    }
  };

  const handleDocumentView = (doc) => {
    setSelectedDoc(doc);
    setIsViewerOpen(true);
  };

  const handleDownload = (doc) => {
    // Simulate download
    console.log('Downloading document:', doc.name);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
        <Icon name="FileText" size={20} />
        <span>Supporting Documents</span>
      </h3>
      
      <div className="space-y-3">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={getDocumentIcon(doc.type)} size={16} className="text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground">{doc.name}</div>
                <div className="text-sm text-muted-foreground flex items-center space-x-2">
                  <span>{doc.size}</span>
                  <span>•</span>
                  <span>Uploaded {doc.uploadDate}</span>
                  {doc.verified && (
                    <>
                      <span>•</span>
                      <span className="text-success flex items-center space-x-1">
                        <Icon name="Shield" size={12} />
                        <span>Verified</span>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDocumentView(doc)}
                iconName="Eye"
                iconPosition="left"
              >
                View
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDownload(doc)}
                iconName="Download"
                iconPosition="left"
              >
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Document Viewer Modal */}
      {isViewerOpen && selectedDoc && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h4 className="font-medium text-foreground">{selectedDoc.name}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsViewerOpen(false)}
                iconName="X"
              />
            </div>
            <div className="p-4 h-96 bg-muted/20 flex items-center justify-center">
              <div className="text-center space-y-2">
                <Icon name={getDocumentIcon(selectedDoc.type)} size={48} className="text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">Document preview would load here</p>
                <p className="text-sm text-muted-foreground">IPFS Hash: {selectedDoc.ipfsHash}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentViewer;