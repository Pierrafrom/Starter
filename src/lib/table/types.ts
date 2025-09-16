import type React from 'react';

/**
 * Configuration minimale pour une colonne de tableau
 */
export interface ColumnConfig<TData = Record<string, unknown>> {
  /** Identifiant unique de la colonne */
  key: string;
  /** Titre affiché dans l'en-tête */
  title: string;
  /** Type de données (pour les futurs enrichissements) */
  type?: 'text' | 'number' | 'date' | 'boolean' | 'badge' | 'custom';
  /** Fonction pour extraire/formater la valeur à afficher */
  accessor?: (data: TData) => React.ReactNode;
  /** La colonne est-elle triable ? (pour futurs enrichissements) */
  sortable?: boolean;
  /** La colonne est-elle filtrable ? (pour futurs enrichissements) */
  filterable?: boolean;
  /** Largeur de la colonne */
  width?: string | number;
  /** Alignement du contenu */
  align?: 'left' | 'center' | 'right';
}

/**
 * Configuration globale du tableau
 */
export interface TableConfig<TData = Record<string, unknown>> {
  /** Configuration des colonnes */
  columns: ColumnConfig<TData>[];
  /** Message affiché quand il n'y a pas de données */
  emptyMessage?: string;
  /** Activer la recherche globale ? (pour futurs enrichissements) */
  searchable?: boolean;
  /** Activer la pagination ? (pour futurs enrichissements) */
  paginated?: boolean;
  /** Nombre d'éléments par page */
  pageSize?: number;
}

/**
 * Props du composant Table générique
 */
export interface GenericTableProps<TData = Record<string, unknown>> {
  /** Données à afficher */
  data: TData[];
  /** Configuration du tableau */
  config: TableConfig<TData>;
  /** Classe CSS additionnelle */
  className?: string;
  /** État de chargement */
  loading?: boolean;
}
