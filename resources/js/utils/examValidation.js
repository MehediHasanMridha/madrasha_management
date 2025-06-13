/**
 * Exam validation utilities
 */

export const validateExamData = (data, isFeeEnabled = false) => {
    const errors = {};
    const warnings = [];

    // Required field validations
    if (!data.examName?.trim()) {
        errors.examName = 'Exam name is required';
    } else if (data.examName.length > 150) {
        errors.examName = 'Exam name cannot exceed 150 characters';
    }

    if (!data.startDate) {
        errors.startDate = 'Start date is required';
    }

    if (!data.endDate) {
        errors.endDate = 'End date is required';
    }

    if (!data.selectedClasses?.length) {
        errors.selectedClasses = 'At least one class must be selected';
    }

    // Date validations
    if (data.startDate && data.endDate) {
        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);
        const now = new Date();

        if (startDate <= now) {
            errors.startDate = 'Start date must be in the future';
        }

        if (endDate <= startDate) {
            errors.endDate = 'End date must be after start date';
        }

        // Check if exam duration is reasonable
        const durationHours = (endDate - startDate) / (1000 * 60 * 60);
        if (durationHours > 24) {
            warnings.push('Exam duration exceeds 24 hours. Please verify the dates.');
        } else if (durationHours < 0.5) {
            warnings.push('Exam duration is less than 30 minutes. Please verify the dates.');
        }
    }

    // Registration period validations
    if (data.registrationStart || data.registrationEnd) {
        if (data.registrationStart && !data.registrationEnd) {
            errors.registrationEnd = 'Registration end date is required when start date is provided';
        }

        if (data.registrationEnd && !data.registrationStart) {
            errors.registrationStart = 'Registration start date is required when end date is provided';
        }

        if (data.registrationStart && data.registrationEnd) {
            const regStart = new Date(data.registrationStart);
            const regEnd = new Date(data.registrationEnd);
            const examStart = new Date(data.startDate);

            if (regEnd <= regStart) {
                errors.registrationEnd = 'Registration end must be after registration start';
            }

            if (data.startDate && regEnd >= examStart) {
                errors.registrationEnd = 'Registration must end before exam starts';
            }

            if (regStart <= new Date()) {
                warnings.push('Registration start date is in the past');
            }
        }
    }

    // Marks validations
    if (data.totalMarks) {
        const totalMarks = parseInt(data.totalMarks);
        if (totalMarks < 1) {
            errors.totalMarks = 'Total marks must be at least 1';
        } else if (totalMarks > 1000) {
            errors.totalMarks = 'Total marks cannot exceed 1000';
        }
    }

    if (data.passMarks) {
        const passMarks = parseInt(data.passMarks);
        const totalMarks = parseInt(data.totalMarks) || 100;

        if (passMarks < 1) {
            errors.passMarks = 'Pass marks must be at least 1';
        } else if (passMarks > totalMarks) {
            errors.passMarks = 'Pass marks cannot exceed total marks';
        }
    }

    // Duration validation
    if (data.durationMinutes) {
        const duration = parseInt(data.durationMinutes);
        if (duration < 1) {
            errors.durationMinutes = 'Duration must be at least 1 minute';
        } else if (duration > 1440) {
            errors.durationMinutes = 'Duration cannot exceed 24 hours (1440 minutes)';
        }
    }

    // Fee validations
    if (isFeeEnabled) {
        if (!data.examFee || parseFloat(data.examFee) <= 0) {
            errors.examFee = 'Exam fee is required when fee is enabled';
        } else if (parseFloat(data.examFee) > 999999.99) {
            errors.examFee = 'Exam fee cannot exceed 999,999.99';
        }
    }

    // Description length validation
    if (data.description && data.description.length > 1000) {
        errors.description = 'Description cannot exceed 1000 characters';
    }

    // Instructions length validation
    if (data.instructions && data.instructions.length > 2000) {
        errors.instructions = 'Instructions cannot exceed 2000 characters';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
        warnings
    };
};

export const formatDateTime = (dateTime) => {
    if (!dateTime) return '';
    return new Date(dateTime).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const calculateExamDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return null;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffMs = end - start;

    if (diffMs <= 0) return null;

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffHours > 0) {
        return diffMinutes > 0 ? `${diffHours}h ${diffMinutes}m` : `${diffHours}h`;
    }

    return `${diffMinutes}m`;
};

export const getExamTypeLabel = (type) => {
    const types = {
        'midterm': 'Midterm Examination',
        'final': 'Final Examination',
        'quiz': 'Quiz',
        'assessment': 'Assessment',
        'other': 'Other'
    };

    return types[type] || 'Unknown';
};

export const generateExamSlug = (name) => {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
};
