import { useState } from 'react';
import { userSignup } from '../Services/auth';
import ConfirmTenant from '../components/ConfirmTenant';

export default function CreateTenant() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        tenantName: '',
        domain: '',
        npi: '',
        email: '',
        address: '',
        adminName: '',
        adminEmail: '',
        adminPassword: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateStep1 = () => {
        const newErrors = {};
        
        if (!formData.tenantName) newErrors.tenantName = 'Tenant name is required';
        if (!formData.domain) newErrors.domain = 'Domain is required';
        if (!formData.address) newErrors.address = 'Address is required';
        
        // NPI validation - at least 10 digits
        if (!formData.npi) {
            newErrors.npi = 'NPI is required';
        } else if (!/^\d{10,}$/.test(formData.npi)) {
            newErrors.npi = 'NPI must be at least 10 digits';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};
        
        if (!formData.adminName) newErrors.adminName = 'Admin name is required';
        if (!formData.adminEmail) {
            newErrors.adminEmail = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.adminEmail)) {
            newErrors.adminEmail = 'Please enter a valid email address';
        }
        
        // Password validation - at least 8 characters with letters and numbers
        if (!formData.adminPassword) {
            newErrors.adminPassword = 'Password is required';
        } else if (formData.adminPassword.length < 8) {
            newErrors.adminPassword = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.adminPassword)) {
            newErrors.adminPassword = 'Password must contain both letters and numbers';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep1() && currentStep < 2) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleCreateTenant = async () => {
        // Validate step 2 before submitting
        if (!validateStep2()) {
            return Promise.reject(new Error('Please fix the validation errors'));
        }
        
        try {
            const response = await userSignup(formData);
            console.log('Tenant created successfully:', response);

            if (response.success) {
                // Success - the ConfirmTenant component will handle the UI update
                return Promise.resolve();
            } else {
                // Error case - throw an error to be caught by the ConfirmTenant component
                throw new Error(response.message || 'Failed to create tenant');
            }
        } catch (error) {
            console.error('Error creating tenant:', error);
            // Re-throw the error to be caught by the ConfirmTenant component
            throw error;
        }
    };

    const handleSuccess = () => {
        // Reset form data
        setFormData({
            tenantName: '',
            domain: '',
            adminUserName: '',
            email: '',
            phoneNumber: '',
            adminName: '',
            adminEmail: '',
            adminPhone: ''
        });
        
        // Clear errors
        setErrors({});
        setCurrentStep(1);
    };

    const isStep1Valid = formData.tenantName && formData.domain && formData.address && formData.npi && formData.npi.length >= 10;
    const isStep2Valid = formData.adminName && formData.adminEmail && formData.adminPassword && 
                         formData.adminPassword.length >= 8 && 
                         /(?=.*[a-zA-Z])(?=.*\d)/.test(formData.adminPassword);

    return (
        <div className="h-full bg-white border rounded-2xl overflow-hidden border-gray-200 flex flex-col">
            {/* Header with Step Indicator */}
            <div className="bg-white ">
                <div className="max-w-md  px-11 pt-8 pb-5">
                    {/* Step progress bars */}
                    <div className="flex mb-6">
                        {[...Array(2)].map((_, i) => (
                            <div
                                key={i + 1}
                                className={`h-1 flex-1 mx-1 rounded-full ${i + 1 <= currentStep ? 'bg-[#80B5FF]' : 'bg-gray-300'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 flex items-start justify-start px-12 ">
                <div className="bg-white rounded-lg w-full max-w-3xl ">
                    {currentStep === 1 && (
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Tenant Details</h2>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tenant Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.tenantName}
                                            onChange={(e) => handleInputChange('tenantName', e.target.value)}
                                            placeholder="Enter tenant name"
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                errors.tenantName ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                        {errors.tenantName && (
                                            <p className="mt-1 text-xs text-red-500">{errors.tenantName}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Domain
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.domain}
                                            onChange={(e) => handleInputChange('domain', e.target.value)}
                                            placeholder="eg. hospital.com"
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                errors.domain ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                        {errors.domain && (
                                            <p className="mt-1 text-xs text-red-500">{errors.domain}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            National Provider Identifier (NPI)
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.npi}
                                            onChange={(e) => handleInputChange('npi', e.target.value.replace(/\D/g, ''))}
                                            placeholder="XXXXXXXXXX"
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                errors.npi ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                            maxLength={15}
                                        />
                                        <p className="mt-1 ml-2 text-xs text-gray-500">At least 10 digits</p>
                                        {errors.npi && (
                                            <p className="mt-1 text-xs text-red-500">{errors.npi}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.address}
                                            onChange={(e) => handleInputChange('address', e.target.value)}
                                            placeholder="Enter Address"
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                errors.address ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                        {errors.address && (
                                            <p className="mt-1 text-xs text-red-500">{errors.address}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Admin Contact Information</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Admin Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.adminName}
                                        onChange={(e) => handleInputChange('adminName', e.target.value)}
                                        placeholder="Enter admin name"
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            errors.adminName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.adminName && (
                                        <p className="mt-1 text-xs text-red-500">{errors.adminName}</p>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.adminEmail}
                                            onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                                            placeholder="Enter admin Email ID"
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                errors.adminEmail ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                        {errors.adminEmail && (
                                            <p className="mt-1 text-xs text-red-500">{errors.adminEmail}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            value={formData.adminPassword}
                                            onChange={(e) => handleInputChange('adminPassword', e.target.value)}
                                            placeholder="Enter admin Password"
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                errors.adminPassword ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        />
                                        {errors.adminPassword && (
                                            <p className="mt-1 text-xs text-red-500">{errors.adminPassword}</p>
                                        )}
                                        <p className="mt-1 ml-2 text-xs text-gray-500">
                                            Must be at least 8 characters with letters and numbers
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 mt-6">
                                    <div className="w-5 h-5 rounded-full flex items-center justify-center">
                                        <img src="/i.svg" alt="" />
                                    </div>
                                    <span className="text-sm text-gray-600">
                                        Secure invitation link will be sent to their email (expires in 48 hours)
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Fixed Bottom Navigation */}
            <div className="bg-white border-t border-gray-200">
                <div className="w-full px-6 py-4">
                    <div className="flex gap-6 justify-end">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 1}
                            className="px-15 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Back
                        </button>
                        {currentStep === 1 ? (
                            <button
                                onClick={handleNext}
                                disabled={!isStep1Valid}
                                className="px-15 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                onClick={() => setShowModal(true)}
                                disabled={!isStep2Valid}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Create Tenant</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <ConfirmTenant
                isVisible={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleCreateTenant}
                onSuccess={handleSuccess}
                tenantData={formData}
            />
        </div>
    );
}