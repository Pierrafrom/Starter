// Exemple d'utilisation du factory pattern pour un autre type de données

import {
  GenericTable,
  createTextColumn,
  createNumberColumn,
  createDateColumn,
  createBadgeColumn,
  createTableConfig,
  type TableConfig,
} from '@/lib/table';

// Type pour les produits (exemple)
interface Product {
  id: number;
  name: string;
  price: number;
  category: 'Electronics' | 'Clothing' | 'Books' | 'Home';
  inStock: boolean;
  createdAt: Date;
  rating: number;
}

// Configuration du tableau des produits avec le factory pattern
const productsTableConfig: TableConfig<Product> = createTableConfig(
  [
    createNumberColumn('id', 'ID', { width: '60px' }),
    createTextColumn('name', 'Nom du produit'),
    createNumberColumn('price', 'Prix', {
      decimals: 2,
      prefix: '€',
      width: '100px',
      align: 'right',
    }),
    createBadgeColumn('category', 'Catégorie', {
      width: '120px',
      variantMap: (category: Product['category']) => {
        switch (category) {
          case 'Electronics':
            return 'default';
          case 'Clothing':
            return 'secondary';
          case 'Books':
            return 'outline';
          case 'Home':
            return 'destructive';
          default:
            return 'outline';
        }
      },
    }),
    createBadgeColumn('inStock', 'Disponibilité', {
      width: '120px',
      variantMap: (inStock: boolean) => (inStock ? 'default' : 'destructive'),
      textMap: (inStock: boolean) => (inStock ? 'En stock' : 'Rupture'),
    }),
    createDateColumn('createdAt', 'Ajouté le', {
      width: '150px',
      formatOptions: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
    }),
    createNumberColumn('rating', 'Note', {
      decimals: 1,
      suffix: '/5',
      width: '80px',
      align: 'center',
    }),
  ],
  {
    emptyMessage: 'Aucun produit trouvé',
  },
);

interface ProductTableProps {
  data: Product[];
}

export function ProductTable({ data }: ProductTableProps) {
  return <GenericTable data={data} config={productsTableConfig} />;
}

// Données d'exemple pour tester
export const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    price: 1199.99,
    category: 'Electronics',
    inStock: true,
    createdAt: new Date('2024-01-15'),
    rating: 4.8,
  },
  {
    id: 2,
    name: 'T-shirt Basic',
    price: 29.99,
    category: 'Clothing',
    inStock: false,
    createdAt: new Date('2024-02-10'),
    rating: 4.2,
  },
  {
    id: 3,
    name: 'Clean Code',
    price: 45.0,
    category: 'Books',
    inStock: true,
    createdAt: new Date('2024-01-20'),
    rating: 4.9,
  },
];
