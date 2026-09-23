create extension if not exists pg_net with schema extensions;

/*
 * Shared secret between the database trigger and the notify-enquiry edge
 * function. The secret itself lives only in Vault; the function stores just its
 * SHA-256, so reading the function source reveals nothing usable.
 *
 * After running this, read the hash and put it in the function's SECRET_SHA256:
 *   select encode(extensions.digest(decrypted_secret,'sha256'),'hex')
 *   from vault.decrypted_secrets where name = 'enquiry_webhook_secret';
 */
do $$
declare
  generated text;
begin
  if not exists (select 1 from vault.secrets where name = 'enquiry_webhook_secret') then
    generated := encode(extensions.gen_random_bytes(32), 'hex');
    perform vault.create_secret(
      generated,
      'enquiry_webhook_secret',
      'Authenticates the enquiries INSERT trigger to the notify-enquiry edge function.'
    );
  end if;
end $$;
