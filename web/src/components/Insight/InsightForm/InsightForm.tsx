import type { EditInsightById, UpdateInsightInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  RadioField,
  NumberField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'

type FormInsight = NonNullable<EditInsightById['insight']>

interface InsightFormProps {
  insight?: EditInsightById['insight']
  onSave: (data: UpdateInsightInput, id?: FormInsight['id']) => void
  error: RWGqlError
  loading: boolean
}

const InsightForm = (props: InsightFormProps) => {
  const onSubmit = (data: FormInsight) => {
    if (data.status === '') {
      data.status = null
    }

    props.onSave(data, props?.insight?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormInsight> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="status"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Status
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="insight-status-none"
            name="status"
            defaultValue=""
            defaultChecked={!props.insight?.status}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div className="rw-check-radio-item-none">None</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="insight-status-0"
            name="status"
            defaultValue="LOW"
            defaultChecked={props.insight?.status?.includes('LOW')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Low</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="insight-status-1"
            name="status"
            defaultValue="MEDIUM"
            defaultChecked={props.insight?.status?.includes('MEDIUM')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Medium</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="insight-status-2"
            name="status"
            defaultValue="HIGH"
            defaultChecked={props.insight?.status?.includes('HIGH')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>High</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="insight-status-3"
            name="status"
            defaultValue="URGENT"
            defaultChecked={props.insight?.status?.includes('URGENT')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Urgent</div>
        </div>

        <FieldError name="status" className="rw-field-error" />

        <Label
          name="currentScore"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Current score
        </Label>

        <NumberField
          name="currentScore"
          defaultValue={props.insight?.currentScore}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="currentScore" className="rw-field-error" />

        <Label
          name="pastScores"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Past scores
        </Label>

        <TextAreaField
          name="pastScores"
          defaultValue={JSON.stringify(props.insight?.pastScores)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true }}
        />

        <FieldError name="pastScores" className="rw-field-error" />

        <Label
          name="aiDiagSummary"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Ai diag summary
        </Label>

        <TextAreaField
          name="aiDiagSummary"
          defaultValue={JSON.stringify(props.insight?.aiDiagSummary)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true }}
        />

        <FieldError name="aiDiagSummary" className="rw-field-error" />

        <Label
          name="aiRiskFactors"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Ai risk factors
        </Label>

        <TextAreaField
          name="aiRiskFactors"
          defaultValue={JSON.stringify(props.insight?.aiRiskFactors)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true }}
        />

        <FieldError name="aiRiskFactors" className="rw-field-error" />

        <Label
          name="aiRecommendations"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Ai recommendations
        </Label>

        <TextAreaField
          name="aiRecommendations"
          defaultValue={JSON.stringify(props.insight?.aiRecommendations)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true }}
        />

        <FieldError name="aiRecommendations" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default InsightForm
