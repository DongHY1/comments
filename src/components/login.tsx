import { zodResolver } from '@hookform/resolvers/zod'
import { useAtom } from 'jotai'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { authAtom } from '@/store'

import { supabase } from '../supabaseClient'
const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string()
})
type LoginFormSchemaType = z.infer<typeof LoginFormSchema>
export default function Login() {
  const { toast } = useToast()
  const [, setAuthAtom] = useAtom(authAtom)
  const registerForm = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onLoginFormSubmit(formData: LoginFormSchemaType) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password
    })
    console.log(data.user)
    if (data.user) {
      toast({
        title: 'Login Success!'
      })
    }
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Login Failure! Please try again!'
      })
    }
  }
  function handleRegisterClick() {
    setAuthAtom('register')
  }
  return (
    <Form {...registerForm}>
      <form onSubmit={registerForm.handleSubmit(onLoginFormSubmit)} className="space-y-2">
        <FormField
          control={registerForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="hi@daviddong.me" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={registerForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Login</Button>
        <Button variant="ghost" onClick={handleRegisterClick}>
          Register
        </Button>
      </form>
    </Form>
  )
}
