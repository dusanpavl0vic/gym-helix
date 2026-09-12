export interface ProgramCardProps {
  name: string;
  subtitle: string;
  isActive: boolean;
  isDefault: boolean;
  labels: { active: string; default: string; setActive: string; duplicate: string; edit: string; delete: string };
  canDelete: boolean;
  onOpen: () => void;
  onActivate: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}
