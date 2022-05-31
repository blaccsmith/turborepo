import * as React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import useLeaveConfirm from '@/lib/form';
import { TextField } from '../atoms/TextField';
import MarkdownEditor from './MarkdownEditor';
import { Button } from '../atoms/Button';
import ButtonLink from '../atoms/ButtonLink';
import { MarkdownIcon } from '../atoms/Icons';

type FormData = {
  title: string;
  content: string;
};

type PostFormProps = {
  defaultValues?: FormData;
  isSubmitting?: boolean;
  backTo: string;
  onSubmit: SubmitHandler<FormData>;
};

const PostForm = ({ defaultValues, isSubmitting, backTo, onSubmit }: PostFormProps) => {
  const { control, register, formState, getValues, reset, handleSubmit } = useForm<FormData>({
    defaultValues,
  });

  useLeaveConfirm({ formState });

  const { isSubmitSuccessful } = formState;

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset(getValues());
    }
  }, [isSubmitSuccessful, reset, getValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('title', { required: true })}
        label="Title"
        autoFocus
        required
        className="!py-1.5 text-lg font-semibold"
      />
      <div className="mt-6">
        <Controller
          name="content"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <MarkdownEditor
              label="Post"
              value={field.value}
              onChange={field.onChange}
              onTriggerSubmit={handleSubmit(onSubmit)}
              required
            />
          )}
        />
      </div>
      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="flex gap-4">
          <Button
            type="submit"
            isLoading={isSubmitting}
            loadingChildren={`${defaultValues ? 'Saving' : 'Publishing'}`}
          >
            {defaultValues?.title ? 'Save' : 'Publish'}
          </Button>
          <ButtonLink href={backTo} variant="secondary">
            Cancel
          </ButtonLink>
        </div>
        {!isSubmitting && (
          <a
            href="https://docs.github.com/en/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
            target="_blank"
            rel="noreferrer"
            className="text-secondary hover:text-blue flex items-center gap-2 transition-colors"
          >
            <MarkdownIcon />
            <span className="h-full text-xs">Markdown supported</span>
          </a>
        )}
      </div>
    </form>
  );
};

export default PostForm;
