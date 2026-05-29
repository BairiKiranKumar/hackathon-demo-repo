import type { EditEventById, UpdateEventInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  DatetimeLocalField,
  CheckboxField,
  TextField,
  NumberField,
  RadioField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

type FormEvent = NonNullable<EditEventById['event']>

interface EventFormProps {
  event?: EditEventById['event']
  onSave: (data: UpdateEventInput, id?: FormEvent['id']) => void
  error: RWGqlError
  loading: boolean
}

const EventForm = (props: EventFormProps) => {
  const onSubmit = (data: FormEvent) => {
    props.onSave(data, props?.event?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormEvent> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="start"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Start
        </Label>

        <DatetimeLocalField
          name="start"
          defaultValue={formatDatetime(props.event?.start)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="start" className="rw-field-error" />

        <Label
          name="end"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          End
        </Label>

        <DatetimeLocalField
          name="end"
          defaultValue={formatDatetime(props.event?.end)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="end" className="rw-field-error" />

        <Label
          name="isDraggable"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Is draggable
        </Label>

        <CheckboxField
          name="isDraggable"
          defaultChecked={props.event?.isDraggable}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="isDraggable" className="rw-field-error" />

        <Label
          name="due"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Due
        </Label>

        <DatetimeLocalField
          name="due"
          defaultValue={formatDatetime(props.event?.due)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="due" className="rw-field-error" />

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>

        <TextField
          name="title"
          defaultValue={props.event?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <Label
          name="status"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Status
        </Label>

        <TextField
          name="status"
          defaultValue={props.event?.status}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="status" className="rw-field-error" />

        <Label
          name="duration"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Duration
        </Label>

        <TextField
          name="duration"
          defaultValue={props.event?.duration}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="duration" className="rw-field-error" />

        <Label
          name="encounterId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Encounter id
        </Label>

        <NumberField
          name="encounterId"
          defaultValue={props.event?.encounterId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          emptyAs={'undefined'}
        />

        <FieldError name="encounterId" className="rw-field-error" />

        <Label
          name="priority"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Priority
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="event-priority-0"
            name="priority"
            defaultValue="LOW"
            defaultChecked={props.event?.priority?.includes('LOW')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Low</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="event-priority-1"
            name="priority"
            defaultValue="MEDIUM"
            defaultChecked={props.event?.priority?.includes('MEDIUM')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Medium</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="event-priority-2"
            name="priority"
            defaultValue="HIGH"
            defaultChecked={props.event?.priority?.includes('HIGH')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>High</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="event-priority-3"
            name="priority"
            defaultValue="URGENT"
            defaultChecked={props.event?.priority?.includes('URGENT')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Urgent</div>
        </div>

        <FieldError name="priority" className="rw-field-error" />

        <Label
          name="hint"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Hint
        </Label>

        <TextField
          name="hint"
          defaultValue={props.event?.hint}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="hint" className="rw-field-error" />

        <Label
          name="aiScheduled"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Ai scheduled
        </Label>

        <CheckboxField
          name="aiScheduled"
          defaultChecked={props.event?.aiScheduled}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="aiScheduled" className="rw-field-error" />

        <Label
          name="eventType"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Event type
        </Label>

        <TextField
          name="eventType"
          defaultValue={props.event?.eventType}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="eventType" className="rw-field-error" />

        <Label
          name="state"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          State
        </Label>

        <TextField
          name="state"
          defaultValue={props.event?.state}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="state" className="rw-field-error" />

        <Label
          name="assignedUserId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Assigned user id
        </Label>

        <NumberField
          name="assignedUserId"
          defaultValue={props.event?.assignedUserId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          emptyAs={'undefined'}
        />

        <FieldError name="assignedUserId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default EventForm
