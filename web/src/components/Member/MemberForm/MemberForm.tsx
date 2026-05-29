import type { EditMemberById, UpdateMemberInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
  CheckboxField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

type FormMember = NonNullable<EditMemberById['member']>

interface MemberFormProps {
  member?: EditMemberById['member']
  onSave: (data: UpdateMemberInput, id?: FormMember['id']) => void
  error: RWGqlError
  loading: boolean
}

const MemberForm = (props: MemberFormProps) => {
  const onSubmit = (data: FormMember) => {
    if (data.languageSkills) {
      data.languageSkills = data.languageSkills.filter((value) => !!value)
    }

    props.onSave(data, props?.member?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormMember> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.member?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="dob"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Dob
        </Label>

        <DatetimeLocalField
          name="dob"
          defaultValue={formatDatetime(props.member?.dob)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="dob" className="rw-field-error" />

        <Label
          name="gender"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Gender
        </Label>

        <TextField
          name="gender"
          defaultValue={props.member?.gender}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="gender" className="rw-field-error" />

        <Label
          name="ethnicity"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Ethnicity
        </Label>

        <TextField
          name="ethnicity"
          defaultValue={props.member?.ethnicity}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="ethnicity" className="rw-field-error" />

        <Label
          name="language"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Language
        </Label>

        <TextField
          name="language"
          defaultValue={props.member?.language}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="language" className="rw-field-error" />

        <Label
          name="languageSkills"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Language skills
        </Label>

        <div className="rw-check-radio-items">
          <CheckboxField
            id="member-languageSkills-0"
            name="languageSkills[0]"
            defaultValue="SPEAK"
            defaultChecked={props.member?.languageSkills?.includes('SPEAK')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Speak</div>
        </div>

        <div className="rw-check-radio-items">
          <CheckboxField
            id="member-languageSkills-1"
            name="languageSkills[1]"
            defaultValue="READ"
            defaultChecked={props.member?.languageSkills?.includes('READ')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Read</div>
        </div>

        <div className="rw-check-radio-items">
          <CheckboxField
            id="member-languageSkills-2"
            name="languageSkills[2]"
            defaultValue="WRITE"
            defaultChecked={props.member?.languageSkills?.includes('WRITE')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Write</div>
        </div>

        <FieldError name="languageSkills" className="rw-field-error" />

        <Label
          name="phone"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Phone
        </Label>

        <TextField
          name="phone"
          defaultValue={props.member?.phone}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="phone" className="rw-field-error" />

        <Label
          name="address"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Address
        </Label>

        <TextField
          name="address"
          defaultValue={props.member?.address}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="address" className="rw-field-error" />

        <Label
          name="image"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Image
        </Label>

        <TextField
          name="image"
          defaultValue={props.member?.image}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="image" className="rw-field-error" />

        <Label
          name="quote"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Quote
        </Label>

        <TextField
          name="quote"
          defaultValue={props.member?.quote}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="quote" className="rw-field-error" />

        <Label
          name="bio"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Bio
        </Label>

        <TextField
          name="bio"
          defaultValue={props.member?.bio}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="bio" className="rw-field-error" />

        <Label
          name="insightId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Insight id
        </Label>

        <NumberField
          name="insightId"
          defaultValue={props.member?.insightId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          emptyAs={'undefined'}
        />

        <FieldError name="insightId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default MemberForm
