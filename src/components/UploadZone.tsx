import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, X } from 'lucide-react';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onRemove: () => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  onFileSelect,
  selectedFile,
  onRemove,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    },
    maxFiles: 1,
  });

  if (selectedFile) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        <img
          src={URL.createObjectURL(selectedFile)}
          alt="Preview"
          className="w-full h-96 object-cover rounded-2xl shadow-2xl"
        />
        <motion.button
          onClick={onRemove}
          className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={20} />
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`
        border-4 border-dashed rounded-2xl p-12 text-center cursor-pointer
        transition-all duration-300
        ${isDragActive
          ? 'border-purple-600 bg-purple-50'
          : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50/30'
        }
      `}
    >
      <input {...getInputProps()} />

      <motion.div
        animate={{
          y: isDragActive ? -10 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {isDragActive ? (
          <Upload size={64} className="mx-auto mb-4 text-purple-600" />
        ) : (
          <ImageIcon size={64} className="mx-auto mb-4 text-gray-400" />
        )}

        <h3 className="text-2xl font-bold text-gray-700 mb-2">
          {isDragActive ? 'Solte a imagem aqui' : 'Envie sua obra de arte'}
        </h3>

        <p className="text-gray-500 mb-4">
          Arraste e solte ou clique para selecionar
        </p>

        <p className="text-sm text-gray-400">
          Formatos suportados: PNG, JPG, JPEG, GIF, WEBP
        </p>
      </motion.div>
    </div>
  );
};
