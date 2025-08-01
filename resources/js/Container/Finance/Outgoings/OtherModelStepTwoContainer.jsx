import OtherModelStepTwoComponent from '@/Components/Finance/Outgoings/AllModelStep/OtherModelStepTwoComponent';
import { router, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

const OtherModelStepTwoContainer = ({ type, setStep, setType, api }) => {
    const [date, setDate] = useState(dayjs().format('YYYY-MM-DD')); // Set default date to today & format is YYYY-MM-DD
    const { voucherTypes } = usePage().props;
    const [itemsData, setItemsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [voucherName, setVoucherName] = useState(null);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            items: [{ name: '', amount: 0 }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items',
    });

    useEffect(() => {
        setItemsData(fields);
    }, [fields]);

    const submitData = (value) => {
        router.post(
            route('finance.add_voucher'),
            {
                type: type,
                ...value,
                voucherName: voucherName,
            },
            {
                onStart: () => {
                    setLoading(true);
                },
                onSuccess: (response) => {
                    setLoading(false);
                    reset();
                    setType('');
                    if (response.props.flash.success) {
                        setStep(1);
                        api.success({
                            message: 'Success',
                            description: response.props.flash.success,
                            placement: 'bottomRight',
                        });
                    }
                    if (response.props.flash.error) {
                        api.error({
                            message: 'Error',
                            description: response.props.flash.error,
                            placement: 'bottomRight',
                        });
                    }
                },
                onError: (error) => {
                    console.error('Error submitting data:', error);
                },
                onFinish: () => {
                    setLoading(false);
                },
            },
        );
    };

    return (
        <OtherModelStepTwoComponent
            submitData={handleSubmit(submitData)}
            control={control}
            register={register}
            errors={errors}
            date={date}
            setDate={setDate}
            voucherTypes={voucherTypes}
            fields={fields}
            loading={loading}
            itemsData={itemsData}
            setItemsData={setItemsData}
            append={append}
            remove={remove}
            setStep={setStep}
            setVoucherName={setVoucherName}
        />
    );
};

export default OtherModelStepTwoContainer;
