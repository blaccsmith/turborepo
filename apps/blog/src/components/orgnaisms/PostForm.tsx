import * as React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Tag } from '@prisma/client';
import useLeaveConfirm from '@/lib/form';
import { TextField } from '../atoms/TextField';
import MarkdownEditor from './MarkdownEditor';
import { Button } from '../atoms/Button';
import ButtonLink from '../atoms/ButtonLink';
import { MarkdownIcon } from '../atoms/Icons';
import TagPicker from '../molecules/TagPicker';

type FormData = {
  title: string;
  tags: number[];
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

  const handleTagClick = (tag: Omit<Tag, 'createdAt' | 'updatedAt'>) => {
    const { tags } = getValues();
    if (tags.includes(tag.id)) {
      reset({ ...getValues(), tags: tags.filter(t => t !== tag.id) });
    } else {
      reset({ ...getValues(), tags: [...tags, tag.id] });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('title', { required: true })}
        label="Title"
        autoFocus
        required
        className="!py-1.5 text-lg"
      />
      <TagPicker handleTagClick={handleTagClick} selectedTags={getValues().tags} />
      <div className="mt-6">
        <Controller
          name="content"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <MarkdownEditor
              label="Content"
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
            className="text-secondary hover:text-brand-purple-300 flex items-center gap-2 transition-colors"
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
