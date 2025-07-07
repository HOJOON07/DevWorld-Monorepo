// import {
//   Button,
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
//   Input,
//   Label,
// } from '@devworld/ui';

// export default function SignUpForm() {
//   return (
//     <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
//       <Card className='w-full max-w-md'>
//         <CardHeader className='space-y-4'>
//           <div className='space-y-2'>
//             <CardTitle className='text-2xl font-bold text-center'>Create Account</CardTitle>
//             <CardDescription className='text-center'>
//               Step 1 of 3: Email Verification
//             </CardDescription>
//           </div>

//           {/* Progress Bar */}
//           <div className='space-y-2'>
//             <div className='flex justify-between text-sm text-muted-foreground'>
//               <span>Progress</span>
//               <span>33%</span>
//             </div>
//             <Progress value={33} className='h-2' />
//           </div>

//           {/* Steps Indicator */}
//           <div className='flex items-center justify-between'>
//             <div className='flex items-center space-x-2'>
//               <div className='w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium'>
//                 1
//               </div>
//               <span className='text-sm font-medium'>Email</span>
//             </div>
//             <div className='flex-1 h-px bg-muted mx-4'></div>
//             <div className='flex items-center space-x-2'>
//               <div className='w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm'>
//                 2
//               </div>
//               <span className='text-sm text-muted-foreground'>Verify</span>
//             </div>
//             <div className='flex-1 h-px bg-muted mx-4'></div>
//             <div className='flex items-center space-x-2'>
//               <div className='w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm'>
//                 3
//               </div>
//               <span className='text-sm text-muted-foreground'>Profile</span>
//             </div>
//           </div>
//         </CardHeader>

//         <CardContent className='space-y-6'>
//           {!isEmailSent ? (
//             <form onSubmit={handleSendCode} className='space-y-4'>
//               <div className='space-y-2'>
//                 <Label htmlFor='email'>Email Address</Label>
//                 <div className='relative'>
//                   <Mail className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
//                   <Input
//                     id='email'
//                     type='email'
//                     placeholder='Enter your email address'
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className='pl-10'
//                     required
//                   />
//                 </div>
//                 <p className='text-sm text-muted-foreground'>
//                   We'll send a verification code to this email address
//                 </p>
//               </div>

//               <Button type='submit' className='w-full' disabled={isLoading || !email}>
//                 {isLoading ? (
//                   <>
//                     <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2' />
//                     Sending Code...
//                   </>
//                 ) : (
//                   <>
//                     Send Verification Code
//                     <ArrowRight className='ml-2 h-4 w-4' />
//                   </>
//                 )}
//               </Button>
//             </form>
//           ) : (
//             <div className='text-center space-y-4'>
//               <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto'>
//                 <Check className='w-8 h-8 text-green-600' />
//               </div>
//               <div className='space-y-2'>
//                 <h3 className='font-semibold'>Verification Code Sent!</h3>
//                 <p className='text-sm text-muted-foreground'>
//                   We've sent a 6-digit verification code to
//                 </p>
//                 <p className='font-medium'>{email}</p>
//               </div>
//               <Button className='w-full'>
//                 Continue to Verification
//                 <ArrowRight className='ml-2 h-4 w-4' />
//               </Button>
//               <Button variant='ghost' className='w-full text-sm'>
//                 Didn't receive the code? Resend
//               </Button>
//             </div>
//           )}

//           <div className='text-center'>
//             <p className='text-sm text-muted-foreground'>
//               Already have an account?{' '}
//               <a href='#' className='text-primary hover:underline font-medium'>
//                 Sign in
//               </a>
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
