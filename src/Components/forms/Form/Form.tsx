import React from "react";
import styles from './Form.module.css'


import * as Yup from 'yup'
import { Formik, FormikProps, FormikValues, Form as FormikForm, FormikHelpers } from 'formik';


interface FormProps<T> {
    initialValues: T
    validationSchema: Yup.ObjectSchema<Omit<Partial<T>, "id">>
    onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<void>
    children: (formikProps: FormikProps<T>) => React.ReactNode
    enableReiniciar?: boolean;
}


const Form = <T extends FormikValues>({ initialValues, validationSchema, onSubmit, children }: FormProps<T>) => {
    return (
        <div className={styles.formWrapper}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReiniciar={true}
                onSubmit={onSubmit}
            >
                {(formikProps) => (
                    <FormikForm className={styles.form}>
                        {children(formikProps)}
                    </FormikForm>
                )}
            </Formik>
        </div>
    )
}

export default Form
