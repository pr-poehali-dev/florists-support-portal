ALTER TABLE t_p22811651_florists_support_por.chat_messages
  ADD COLUMN IF NOT EXISTS is_read BOOLEAN DEFAULT FALSE;

ALTER TABLE t_p22811651_florists_support_por.chat_messages
  ADD COLUMN IF NOT EXISTS user_name VARCHAR(100);
