import React, { useEffect } from 'react';
import AiBubble from './AiBubble';
import CfidAgentFloatingChat from './CfidAgentFloatingChat';

interface CfidAgentWidgetHostProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const CfidAgentWidgetHost: React.FC<CfidAgentWidgetHostProps> = ({
  isOpen,
  onOpen,
  onClose,
}) => {
  useEffect(() => {
    document.querySelectorAll('cfid-agent-widget').forEach((node) => node.remove());
  }, []);

  return (
    <>
      {!isOpen && <AiBubble onClick={onOpen} isActive />}
      {isOpen && <CfidAgentFloatingChat onClose={onClose} />}
    </>
  );
};

export default CfidAgentWidgetHost;
