import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentUploadForm = ({ formData, onFormChange, errors }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  const requiredDocuments = [
    {
      id: 'business-license',
      name: 'Business License',
      description: 'Valid business registration or license',
      required: true,
      acceptedTypes: '.pdf,.jpg,.jpeg,.png'
    },
    {
      id: 'financial-statements',
      name: 'Financial Statements',
      description: 'Last 6 months bank statements or financial records',
      required: true,
      acceptedTypes: '.pdf,.xlsx,.xls'
    },
    {
      id: 'identity-document',
      name: 'Identity Document',
      description: 'Government-issued ID (passport, driver\'s license)',
      required: true,
      acceptedTypes: '.pdf,.jpg,.jpeg,.png'
    },
    {
      id: 'business-plan',
      name: 'Business Plan',
      description: 'Detailed business plan or loan usage plan',
      required: false,
      acceptedTypes: '.pdf,.doc,.docx'
    }
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (files) => {
    const fileArray = Array.from(files);
    
    for (const file of fileArray) {
      if (validateFile(file)) {
        await uploadToIPFS(file);
      }
    }
  };

  const validateFile = (file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (file.size > maxSize) {
      alert('File size must be less than 10MB');
      return false;
    }

    if (!allowedTypes.includes(file.type)) {
      alert('File type not supported. Please upload PDF, image, or document files.');
      return false;
    }

    return true;
  };

  const uploadToIPFS = async (file) => {
    const fileId = Date.now().toString();
    setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));

    try {
      // Simulate IPFS upload with progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadProgress(prev => ({ ...prev, [fileId]: progress }));
      }

      // Mock IPFS hash
      const ipfsHash = `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
      
      const uploadedFile = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        ipfsHash: ipfsHash,
        uploadedAt: new Date().toISOString(),
        status: 'uploaded'
      };

      const currentDocuments = formData.documents || [];
      onFormChange('documents', [...currentDocuments, uploadedFile]);

      // Remove from progress tracking
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[fileId];
        return newProgress;
      });

    } catch (error) {
      console.error('Upload failed:', error);
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[fileId];
        return newProgress;
      });
    }
  };

  const removeDocument = (documentId) => {
    const updatedDocuments = (formData.documents || []).filter(doc => doc.id !== documentId);
    onFormChange('documents', updatedDocuments);
  };

  const getDocumentIcon = (type) => {
    if (type.includes('pdf')) return 'FileText';
    if (type.includes('image')) return 'Image';
    if (type.includes('sheet') || type.includes('excel')) return 'FileSpreadsheet';
    if (type.includes('word') || type.includes('document')) return 'FileText';
    return 'File';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getUploadedDocumentsByType = (docType) => {
    return (formData.documents || []).filter(doc => 
      doc.name.toLowerCase().includes(docType.toLowerCase()) ||
      doc.category === docType
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-accent/10 border-2 border-accent rounded-xl shadow-lg animate-popIn">
          <Icon name="Upload" size={22} className="text-accent" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Document Upload</h3>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center shadow-xl bg-card/80 backdrop-blur-md transition-smooth ${
          dragActive 
            ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50'
        } animate-fadeInUp`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileInput}
          accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls,.doc,.docx"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
              <Icon name="Upload" size={24} className="text-primary" />
            </div>
          </div>
          
          <div>
            <p className="text-lg font-medium text-foreground">
              Drop files here or click to upload
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Supports PDF, images, and documents up to 10MB each
            </p>
          </div>
          
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            iconName="FolderOpen"
            iconPosition="left"
          >
            Browse Files
          </Button>
        </div>
      </div>

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Uploading to IPFS...</h4>
          {Object.entries(uploadProgress).map(([fileId, progress]) => (
            <div key={fileId} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Uploading file...</span>
                <span className="text-sm font-medium">{progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Required Documents Checklist */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-foreground">Required Documents</h4>
        
        {requiredDocuments.map((docType) => {
          const uploadedDocs = getUploadedDocumentsByType(docType.id);
          const isUploaded = uploadedDocs.length > 0;
          
          return (
            <div key={docType.id} className="p-4 border border-border rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h5 className="font-medium text-foreground">{docType.name}</h5>
                    {docType.required && (
                      <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded">
                        Required
                      </span>
                    )}
                    {isUploaded && (
                      <Icon name="CheckCircle" size={16} className="text-success" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{docType.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Accepted: {docType.acceptedTypes}
                  </p>
                </div>
              </div>
              
              {uploadedDocs.length > 0 && (
                <div className="mt-3 space-y-2">
                  {uploadedDocs.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-2 bg-muted rounded">
                      <div className="flex items-center space-x-3">
                        <Icon name={getDocumentIcon(doc.type)} size={16} className="text-primary" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(doc.size)} • IPFS: {doc.ipfsHash.substring(0, 12)}...
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDocument(doc.id)}
                        iconName="Trash2"
                        className="text-destructive hover:text-destructive"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* All Uploaded Documents */}
      {formData.documents && formData.documents.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground">
            All Uploaded Documents ({formData.documents.length})
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {formData.documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name={getDocumentIcon(doc.type)} size={20} className="text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(doc.size)} • {new Date(doc.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDocument(doc.id)}
                  iconName="X"
                  className="text-muted-foreground hover:text-destructive"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {errors.documents && (
        <p className="text-sm text-destructive">{errors.documents}</p>
      )}
    </div>
  );
};

export default DocumentUploadForm;