import React, { useState } from 'react';
import { X, Copy, Mail, MessageCircle } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileName: string;
  profileUrl: string;
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  profileName,
  profileUrl,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareViaEmail = () => {
    const subject = `Check out ${profileName}'s profile`;
    const body = `I wanted to share ${profileName}'s profile with you.\n\n${profileUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const shareViaWhatsApp = () => {
    const text = `Check out ${profileName}'s profile: ${profileUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareViaX = () => {
    const text = `Check out ${profileName}'s profile on Pathly`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(profileUrl)}`, '_blank');
  };

  const shareViaFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-9999 p-4 "
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6"
        style={{ minWidth: "400px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-xl font-bold text-gray-900">
            Share profile
          </h4>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Copy link
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={profileUrl}
              readOnly
              className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600"
            />
            <button
              onClick={handleCopyLink}
              className="p-2 border-2 border-[#553be6] text-[#553be6] rounded-lg hover:bg-purple-50 transition-colors duration-200"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
          {copied && (
            <p className="text-xs text-green-600 mt-1">Copied to clipboard!</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Share via
          </label>
          <div className="flex gap-3">
            <button
              onClick={shareViaEmail}
              className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              title="Email"
            >
              <Mail className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={shareViaWhatsApp}
              className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              title="WhatsApp"
            >
              <MessageCircle className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={shareViaX}
              className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              title="X (Twitter)"
            >
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </button>
            <button
              onClick={shareViaFacebook}
              className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              title="Facebook"
            >
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;