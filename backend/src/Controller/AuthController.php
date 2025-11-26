<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class AuthController extends AbstractController
{
    public function __construct(
        private UserRepository $userRepository,
        private EntityManagerInterface $entityManager,
        private UserPasswordHasherInterface $passwordHasher
    ) {
    }

    #[Route('/login', name: 'api_login', methods: ['POST'])]
    public function login(): JsonResponse
    {
        // Cette méthode est gérée par le security.yaml avec json_login
        // Elle ne sera jamais appelée directement
        return new JsonResponse(['message' => 'Login endpoint']);
    }

    #[Route('/admin/forgot-password', name: 'api_forgot_password', methods: ['POST'])]
    public function forgotPassword(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        if (!isset($data['username']) || !isset($data['garageCode'])) {
            return new JsonResponse([
                'error' => 'Username and garageCode are required'
            ], Response::HTTP_BAD_REQUEST);
        }

        $garageCode = $_ENV['GARAGE_CODE'] ?? null;
        
        if (!$garageCode || $data['garageCode'] !== $garageCode) {
            return new JsonResponse([
                'error' => 'Invalid garage code'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user = $this->userRepository->findOneBy(['username' => $data['username']]);
        
        if (!$user) {
            return new JsonResponse([
                'error' => 'User not found'
            ], Response::HTTP_NOT_FOUND);
        }

        // Retourner un token temporaire ou simplement confirmer que l'utilisateur peut réinitialiser
        return new JsonResponse([
            'message' => 'Garage code verified. You can now reset your password.',
            'username' => $user->getUsername()
        ]);
    }

    #[Route('/admin/reset-password', name: 'api_reset_password', methods: ['PUT'])]
    public function resetPassword(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        if (!isset($data['username']) || !isset($data['garageCode']) || !isset($data['newPassword'])) {
            return new JsonResponse([
                'error' => 'Username, garageCode and newPassword are required'
            ], Response::HTTP_BAD_REQUEST);
        }

        $garageCode = $_ENV['GARAGE_CODE'] ?? null;
        
        if (!$garageCode || $data['garageCode'] !== $garageCode) {
            return new JsonResponse([
                'error' => 'Invalid garage code'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user = $this->userRepository->findOneBy(['username' => $data['username']]);
        
        if (!$user) {
            return new JsonResponse([
                'error' => 'User not found'
            ], Response::HTTP_NOT_FOUND);
        }

        $hashedPassword = $this->passwordHasher->hashPassword($user, $data['newPassword']);
        $user->setPassword($hashedPassword);
        
        $this->entityManager->flush();

        return new JsonResponse([
            'message' => 'Password reset successfully'
        ]);
    }

    #[Route('/admin/change-password', name: 'api_change_password', methods: ['PUT'])]
    public function changePassword(Request $request): JsonResponse
    {
        $user = $this->getUser();
        
        if (!$user instanceof User) {
            return new JsonResponse([
                'error' => 'User not authenticated'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $data = json_decode($request->getContent(), true);
        
        if (!isset($data['currentPassword']) || !isset($data['newPassword'])) {
            return new JsonResponse([
                'error' => 'currentPassword and newPassword are required'
            ], Response::HTTP_BAD_REQUEST);
        }

        if (!$this->passwordHasher->isPasswordValid($user, $data['currentPassword'])) {
            return new JsonResponse([
                'error' => 'Invalid current password'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $hashedPassword = $this->passwordHasher->hashPassword($user, $data['newPassword']);
        $user->setPassword($hashedPassword);
        
        $this->entityManager->flush();

        return new JsonResponse([
            'message' => 'Password changed successfully'
        ]);
    }
}


