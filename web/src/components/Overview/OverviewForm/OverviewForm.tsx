import type { EditOverviewById, UpdateOverviewInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'

type FormOverview = NonNullable<EditOverviewById['overview']>

interface OverviewFormProps {
  overview?: EditOverviewById['overview']
  onSave: (data: UpdateOverviewInput, id?: FormOverview['id']) => void
  error: RWGqlError
  loading: boolean
}

const OverviewForm = (props: OverviewFormProps) => {
  const onSubmit = (data: FormOverview) => {
    props.onSave(data, props?.overview?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormOverview> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="overview"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Overview
        </Label>

        <TextAreaField
          name="overview"
          defaultValue={JSON.stringify(props.overview?.overview)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true }}
        />

        <FieldError name="overview" className="rw-field-error" />

        <Label
          name="careManagement"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Care management
        </Label>

        <TextAreaField
          name="careManagement"
          defaultValue={JSON.stringify(props.overview?.careManagement)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true }}
        />

        <FieldError name="careManagement" className="rw-field-error" />

        <Label
          name="operationalMetrics"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Operational metrics
        </Label>

        <TextAreaField
          name="operationalMetrics"
          defaultValue={JSON.stringify(props.overview?.operationalMetrics)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true }}
        />

        <FieldError name="operationalMetrics" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default OverviewForm
