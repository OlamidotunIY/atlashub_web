

export function InvitePage()
{
  // const { token } = useParams<{ token: string }>();
  // const navigate = useNavigate();

  // const isAuthenticated = authStore(state => state.isAuthenticated());

  // const { data: invitation, isLoading, isError } = useInvitation(token || '');

  // const acceptMutation = useAcceptInvitation();
  // const declineMutation = useDeclineInvitation();

  // useEffect(() =>
  // {
  //   if (!isAuthenticated && invitation && invitation.status === 'PENDING')
  //   {
  //     const targetRoute = invitation.userExist
  //       ? MERCHANT_ROUTES.LOGIN
  //       : MERCHANT_ROUTES.REGISTRATION;

  //     navigate(targetRoute, {
  //       state: {
  //         invitedEmail: invitation.invitedEmail,
  //         invitationToken: token,
  //         from: `/invite/${token}` // Let auth flow redirect back here after login/signup
  //       },
  //       replace: true
  //     });
  //   }
  // }, [isAuthenticated, invitation, navigate, token]);

  // if (!token)
  // {
  //   return <Navigate to={MERCHANT_ROUTES.LOGIN} replace />;
  // }

  // if (isLoading)
  // {
  //   return <SplashScreen message="Loading invitation details..." />;
  // }

  // if (isError || (invitation && invitation.status !== 'PENDING'))
  // {
  //   const errorMsg = invitation?.status !== 'PENDING'
  //     ? `This invitation is ${invitation?.status?.toLowerCase() || 'no longer valid'}.`
  //     : 'The invitation link is invalid or has expired.';

  //   return (
  //     <div className="flex min-h-[50vh] items-center justify-center p-4">
  //       <ErrorState
  //         title="Invalid Invitation"
  //         message={errorMsg}
  //       />
  //     </div>
  //   );
  // }

  // // If authenticated and PENDING, show accept/decline UI
  // return (
  //   <div className="flex min-h-[50vh] items-center justify-center p-4">
  //     <Card className="w-full max-w-md">
  //       <CardHeader>
  //         <CardTitle>You've been invited!</CardTitle>
  //         <CardDescription>
  //           You have a pending invitation to join an organization as a {invitation?.role || 'member'}.
  //         </CardDescription>
  //       </CardHeader>
  //       <CardContent>
  //         <p className="text-sm text-muted-foreground">
  //           Invited email: <span className="font-medium text-foreground">{invitation?.invitedEmail}</span>
  //         </p>
  //       </CardContent>
  //       <CardFooter className="flex justify-end gap-3">
  //         <Button
  //           variant="outline"
  //           disabled={declineMutation.isPending || acceptMutation.isPending}
  //           onClick={async () =>
  //           {
  //             await declineMutation.mutateAsync(token);
  //             navigate(MERCHANT_ROUTES.DASHBOARD, { replace: true });
  //           }}
  //         >
  //           {declineMutation.isPending ? 'Declining...' : 'Decline'}
  //         </Button>
  //         <Button
  //           disabled={acceptMutation.isPending || declineMutation.isPending}
  //           onClick={async () =>
  //           {
  //             await acceptMutation.mutateAsync(token);
  //             navigate(MERCHANT_ROUTES.DASHBOARD, { replace: true });
  //           }}
  //         >
  //           {acceptMutation.isPending ? 'Accepting...' : 'Accept Invitation'}
  //         </Button>
  //       </CardFooter>
  //     </Card>
  //   </div>
  // );

  return <div></div>
}
