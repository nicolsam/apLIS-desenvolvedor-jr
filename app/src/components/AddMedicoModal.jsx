import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createMedico, updateMedico } from '../api/medicos';
import { parseWithSchema, medicoSchema } from '../validation/schemas';

export default function AddMedicoModal({ show, onClose, onSuccess, isEdit = false, initialData = null, onSuccessEdit }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    nome: '',
    CRM: '',
    UFCRM: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        nome: initialData.nome || '',
        CRM: initialData.CRM || '',
        UFCRM: initialData.UFCRM || '',
      });
    } else if (!isEdit) {
      setFormData({ nome: '', CRM: '', UFCRM: '' });
    }
  }, [isEdit, initialData, show]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    const result = parseWithSchema(medicoSchema, t, formData);
    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    try {
      setLoading(true);
      if (isEdit && initialData) {
        await updateMedico(initialData.id, formData);
        setFormData({ nome: '', CRM: '', UFCRM: '' });
        if (onSuccessEdit) onSuccessEdit();
        onClose();
      } else {
        await createMedico(formData);
        setFormData({ nome: '', CRM: '', UFCRM: '' });
        onSuccess();
        onClose();
      }
    } catch (err) {
      let errorMessage = err.message;
      try {
        const parsed = JSON.parse(err.message);
        errorMessage = parsed.error || errorMessage;
      } catch {}
      setServerError(errorMessage || t(isEdit ? 'medicos.addModal.updateError' : 'medicos.addModal.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="flex items-center justify-between p-4 border-b rounded-t-lg md:p-5 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {isEdit ? t('medicos.addModal.editTitle') : t('medicos.addModal.title')}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex items-center justify-center">
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4l6 6M10 4l-6 6"/>
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {serverError && <div className="text-red-600 text-sm p-2 bg-red-50 rounded">{serverError}</div>}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('medicos.addModal.name')}</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder={t('medicos.addModal.name')}
              className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${errors.nome ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
            />
            {errors.nome && <p className="mt-1 text-sm text-red-500">{errors.nome}</p>}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('medicos.addModal.crm')}</label>
            <input
              type="text"
              name="CRM"
              value={formData.CRM}
              onChange={handleChange}
              placeholder={t('medicos.addModal.crm')}
              className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${errors.CRM ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
            />
            {errors.CRM && <p className="mt-1 text-sm text-red-500">{errors.CRM}</p>}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('medicos.addModal.uf')}</label>
            <input
              type="text"
              name="UFCRM"
              value={formData.UFCRM}
              onChange={handleChange}
              placeholder={t('medicos.addModal.uf')}
              maxLength="2"
              className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 ${errors.UFCRM ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} dark:bg-gray-700 dark:border-gray-600 dark:text-white uppercase`}
            />
            {errors.UFCRM && <p className="mt-1 text-sm text-red-500">{errors.UFCRM}</p>}
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              {t('medicos.addModal.cancel')}
            </button>
            <button type="submit" disabled={loading} className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm font-medium px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700">
              {loading ? (isEdit ? t('medicos.addModal.updating') : t('medicos.addModal.saving')) : t('medicos.addModal.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}