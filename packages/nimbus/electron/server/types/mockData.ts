export type Fields = Profile

export type Profile = {
	// Personal Information
	$firstName: string
	$lastName: string
	$fullName: string
	$prefixName: string
	$suffixName: string
	$middleName: string
	$displayName: string
	$nickname: string

	// Demographics
	$age: number
	$birthday: string
	$gender: string
	$pronouns: string
	$nationality: string
	$language: string[]
	$timezone: string

	// Contact Information
	$email: string
	$phoneNumber: string
	$alternativeEmail: string
	$relationship: string
	$emergencyContactPhone: string

	// Address Information
    $address:string
	$address1: string
    $address2: string
	$addressCity: string
	$addressState: string
	$addressCountry: string
	$addressPostalCode: string

	// Account Information
	$userId: string
	$username: string
	$accountStatus: 'active' | 'inactive' | 'suspended' | 'pending'
	$registrationDate: string
	$lastLoginDate: string
	$lastActivityDate: string
	$accountType: 'free' | 'premium' | 'enterprise'
	$verificationStatus: 'unverified' | 'pending' | 'verified'

	// Preferences
	$emailNotifications: boolean
	$pushNotifications: boolean
	$marketingPreferencesEmail: boolean
	$marketingPreferencesSms: boolean
	$marketingPreferencesPush: boolean
	$communicationLanguage: string
	$theme: 'light' | 'dark' | 'system'

	// Social
	$socialProfilesLinkedin: string
	$socialProfilesTwitter: string
	$socialProfilesFacebook: string
	$socialProfilesGithub: string

	// Professional Information
	$occupation: string
	$company: string
	$department: string
	$jobTitle: string
	$skills: string[]
	$professionalBio: string

	// Security
	$twoFactorEnabled: boolean
	$lastPasswordChange: string
	$securityQuestionsQuestion: string
	$securityQuestionsAnswer: string

	// Metadata
	$tags: string[]
	$notes: string
	$customFields: Record<string, unknown>
	$lastModified: string
	$createdBy: string
	$updatedBy: string
}

export type UserFields = {
	$userId: string
	$email: string
	$username: string
	$password: string // Hashed
	$firstName: string
	$lastName: string
	$avatar: string
	$role: 'admin' | 'user' | 'moderator'
	$status: 'active' | 'inactive' | 'suspended'
	$lastLogin: string
	$emailVerified: boolean
	$phoneNumber: string
	$address: string
	$city: string
	$country: string
	$timezone: string
	$language: string
	$createdAt: string
	$updatedAt: string
}

// Products
export type ProductFields = {
	$productId: string
	$name: string
	$description: string
	$sku: string
	$brand: string
	$manufacturer: string
	$category: string
	$subCategory: string
	$price: number
	$salePrice: number
	$costPrice: number
	$currency: string
	$quantity: number
	$inStock: boolean
	$weight: number
	$weightUnit: string
	$dimensions: string
	$color: string
	$size: string
	$material: string
	$warrantyPeriod: string
	$returnPolicy: string
	$tags: string[]
	$images: string[]
	$thumbnailImage: string
	$rating: number
	$reviewCount: number
	$isPublished: boolean
	$isCustomizable: boolean
	$customizationOptions: string[]
	$minOrderQuantity: number
	$maxOrderQuantity: number
	$createdAt: string
	$updatedAt: string
	$deletedAt: string
}

// Orders
export type OrderFields = {
	$orderId: string
	$userId: string
	$orderNumber: string
	$orderDate: string
	$orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
	$paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
	$totalAmount: number
	$subtotalAmount: number
	$taxAmount: number
	$shippingAmount: number
	$discountAmount: number
	$currency: string
	$shippingMethod: string
	$shippingTrackingNumber: string
	$shippingCarrier: string
	$shippingAddress: string
	$shippingCity: string
	$shippingState: string
	$shippingCountry: string
	$shippingPostalCode: string
	$billingAddress: string
	$billingCity: string
	$billingState: string
	$billingCountry: string
	$billingPostalCode: string
	$customerNotes: string
	$internalNotes: string
	$estimatedDeliveryDate: string
	$actualDeliveryDate: string
	$returnRequestDate: string
	$returnStatus: string
	$createdAt: string
	$updatedAt: string
}

// Categories
export type CategoryFields = {
	$categoryId: string
	$name: string
	$description: string
	$slug: string
	$parentCategoryId: string
	$level: number
	$path: string
	$imageUrl: string
	$iconUrl: string
	$isActive: boolean
	$displayOrder: number
	$productCount: number
	$metaTitle: string
	$metaDescription: string
	$metaKeywords: string[]
	$attributes: string[]
	$filters: string[]
	$createdAt: string
	$updatedAt: string
}

// Payments
export type PaymentFields = {
	$paymentId: string
	$orderId: string
	$userId: string
	$amount: number
	$currency: string
	$paymentMethod: string
	$paymentGateway: string
	$transactionId: string
	$transactionStatus: 'pending' | 'successful' | 'failed' | 'refunded'
	$paymentDate: string
	$cardType: string
	$cardLastFourDigits: string
	$cardExpiryMonth: string
	$cardExpiryYear: string
	$billingName: string
	$billingEmail: string
	$billingPhone: string
	$billingAddress: string
	$billingCity: string
	$billingState: string
	$billingCountry: string
	$billingPostalCode: string
	$refundAmount: number
	$refundReason: string
	$refundDate: string
	$failureReason: string
	$failureCode: string
	$receiptUrl: string
	$invoiceUrl: string
	$notes: string
	$createdAt: string
	$updatedAt: string
}

// Reviews
export type ReviewFields = {
	$reviewId: string
	$userId: string
	$productId: string
	$orderId: string
	$rating: number
	$title: string
	$description: string
	$pros: string
	$cons: string
	$verifiedPurchase: boolean
	$helpfulVotes: number
	$unhelpfulVotes: number
	$reportCount: number
	$status: 'pending' | 'approved' | 'rejected'
	$moderatorNotes: string
	$images: string[]
	$videoUrls: string[]
	$responseFromSeller: string
	$responseDate: string
	$isEdited: boolean
	$editDate: string
	$createdAt: string
	$updatedAt: string
}

// Locations
export type LocationFields = {
	$locationId: string
	$name: string
	$type: string
	$address: string
	$street: string
	$city: string
	$state: string
	$country: string
	$postalCode: string
	$latitude: number
	$longitude: number
	$timezone: string
	$phone: string
	$email: string
	$website: string
	$operatingHours: string
	$capacity: number
	$isActive: boolean
	$amenities: string[]
	$accessibility: string[]
	$parkingAvailable: boolean
	$publicTransportNearby: boolean
	$imageUrls: string[]
	$virtualTourUrl: string
	$rating: number
	$reviewCount: number
	$lastInspectionDate: string
	$createdAt: string
	$updatedAt: string
}

// Electronics
export type ElectronicsFields = {
	$productId: string
	$name: string
	$description: string
	$brand: string
	$model: string
	$releaseDate: string
	$processor: string
	$ram: string
	$storage: string
	$screenSize: string
	$resolution: string
	$batteryLife: string
	$operatingSystem: string
	$connectivity: string[]
	$ports: string[]
	$camera: string
	$weight: number
	$dimensions: string
	$color: string
	$warranty: string
	$price: number
	$powerConsumption: string
	$energyRating: string
	$accessories: string[]
	$compatibleDevices: string[]
	$systemRequirements: string[]
	$features: string[]
	$certifications: string[]
	$manufacturerPartNumber: string
	$createdAt: string
	$updatedAt: string
}

// Fashion
export type FashionFields = {
	$productId: string
	$name: string
	$description: string
	$brand: string
	$category: string
	$gender: string
	$size: string
	$color: string
	$material: string[]
	$pattern: string
	$style: string
	$season: string
	$occasion: string
	$careInstructions: string[]
	$fitType: string
	$neckline: string
	$sleeve: string
	$closure: string
	$fabric: string
	$measurements: string
	$origin: string
	$sustainabilityInfo: string
	$washingInstructions: string
	$price: number
	$collection: string
	$designerNotes: string
	$isLimited: boolean
	$createdAt: string
	$updatedAt: string
}

// Furniture
export type FurnitureFields = {
	$productId: string
	$name: string
	$description: string
	$category: string
	$style: string
	$material: string[]
	$color: string
	$dimensions: string
	$weight: number
	$assemblyRequired: boolean
	$assemblyTime: string
	$roomType: string
	$seatingCapacity: number
	$loadCapacity: number
	$finish: string
	$care: string[]
	$warranty: string
	$price: number
	$isCustomizable: boolean
	$customizationOptions: string[]
	$deliveryType: string
	$estimatedDeliveryTime: string
	$brand: string
	$manufacturer: string
	$origin: string
	$certifications: string[]
	$createdAt: string
	$updatedAt: string
}

// Shipments
export type ShipmentFields = {
	$shipmentId: string
	$orderId: string
	$trackingNumber: string
	$carrier: string
	$method: string
	$status: string
	$estimatedDeliveryDate: string
	$actualDeliveryDate: string
	$shippingLabel: string
	$weight: number
	$dimensions: string
	$packages: number
	$fromAddress: string
	$fromCity: string
	$fromState: string
	$fromCountry: string
	$fromPostalCode: string
	$toAddress: string
	$toCity: string
	$toState: string
	$toCountry: string
	$toPostalCode: string
	$signatureRequired: boolean
	$insurance: boolean
	$insuranceAmount: number
	$notes: string
	$createdAt: string
	$updatedAt: string
}

// Tracking
export type TrackingFields = {
	$trackingId: string
	$shipmentId: string
	$trackingNumber: string
	$status: string
	$location: string
	$timestamp: string
	$description: string
	$expectedNextUpdate: string
	$carrier: string
	$service: string
	$estimatedDeliveryDate: string
	$lastMileCarrier: string
	$signedBy: string
	$proofOfDelivery: string
	$exceptions: string[]
	$createdAt: string
	$updatedAt: string
}

// Books
export type BookFields = {
	$bookId: string
	$title: string
	$subtitle: string
	$authors: string[]
	$publisher: string
	$publishDate: string
	$isbn10: string
	$isbn13: string
	$language: string
	$pageCount: number
	$format: string
	$genre: string[]
	$category: string
	$description: string
	$edition: string
	$series: string
	$volume: number
	$price: number
	$currency: string
	$coverImage: string
	$backCoverImage: string
	$tableOfContents: string[]
	$keywords: string[]
	$rating: number
	$reviewCount: number
	$ageRange: string
	$readingLevel: string
	$awards: string[]
	$dimensions: string
	$weight: number
	$createdAt: string
	$updatedAt: string
}

// Movies
export type MovieFields = {
	$movieId: string
	$title: string
	$originalTitle: string
	$releaseDate: string
	$duration: number
	$genre: string[]
	$director: string[]
	$producer: string[]
	$cast: string[]
	$description: string
	$rating: string
	$userRating: number
	$language: string
	$subtitles: string[]
	$country: string
	$budget: number
	$boxOffice: number
	$studio: string
	$format: string[]
	$availability: string[]
	$streamingPlatforms: string[]
	$trailerUrl: string
	$posterUrl: string
	$awards: string[]
	$keywords: string[]
	$soundtrack: string[]
	$certification: string
	$createdAt: string
	$updatedAt: string
}

// Music
export type MusicFields = {
	$trackId: string
	$title: string
	$artist: string[]
	$album: string
	$genre: string[]
	$duration: number
	$releaseDate: string
	$label: string
	$writer: string[]
	$producer: string[]
	$lyrics: string
	$language: string
	$bpm: number
	$key: string
	$isrc: string
	$explicit: boolean
	$copyrightInfo: string
	$streamingUrl: string[]
	$downloadUrl: string
	$coverArt: string
	$popularity: number
	$playCount: number
	$format: string
	$quality: string
	$fileSize: number
	$createdAt: string
	$updatedAt: string
}

// Podcasts
export type PodcastFields = {
	$podcastId: string
	$title: string
	$host: string[]
	$description: string
	$category: string[]
	$language: string
	$publisher: string
	$website: string
	$email: string
	$rssUrl: string
	$itunesUrl: string
	$spotifyUrl: string
	$coverArt: string
	$episodeCount: number
	$frequency: string
	$averageDuration: number
	$rating: number
	$reviewCount: number
	$subscribers: number
	$startDate: string
	$latestEpisodeDate: string
	$explicit: boolean
	$tags: string[]
	$sponsorships: string[]
	$createdAt: string
	$updatedAt: string
}

// E-books
export type EbookFields = {
	$ebookId: string
	$title: string
	$author: string[]
	$publisher: string
	$publishDate: string
	$isbn: string
	$format: string[]
	$fileSize: number
	$pageCount: number
	$language: string
	$description: string
	$genre: string[]
	$price: number
	$currency: string
	$drm: boolean
	$downloadUrl: string
	$coverImage: string
	$sampleUrl: string
	$keywords: string[]
	$readingTime: number
	$supportedDevices: string[]
	$minimumSoftwareRequirements: string
	$rating: number
	$reviewCount: number
	$createdAt: string
	$updatedAt: string
}

// Audiobooks
export type AudiobookFields = {
	$audiobookId: string
	$title: string
	$author: string[]
	$narrator: string[]
	$publisher: string
	$publishDate: string
	$duration: number
	$language: string
	$description: string
	$genre: string[]
	$price: number
	$currency: string
	$format: string
	$fileSize: number
	$bitrate: number
	$sampleUrl: string
	$coverImage: string
	$chapters: string[]
	$abridged: boolean
	$rating: number
	$reviewCount: number
	$supportedPlatforms: string[]
	$downloadUrl: string
	$createdAt: string
	$updatedAt: string
}

// Restaurants
export type RestaurantFields = {
	$restaurantId: string
	$name: string
	$description: string
	$cuisine: string[]
	$address: string
	$city: string
	$state: string
	$country: string
	$postalCode: string
	$phone: string
	$email: string
	$website: string
	$rating: number
	$priceRange: string
	$openingHours: string
	$seatingCapacity: number
	$takeout: boolean
	$delivery: boolean
	$reservations: boolean
	$parkingAvailable: boolean
	$wifi: boolean
	$outdoorSeating: boolean
	$accessibility: boolean
	$paymentMethods: string[]
	$photos: string[]
	$menuUrl: string
	$features: string[]
	$certifications: string[]
	$healthScore: number
	$lastInspectionDate: string
	$createdAt: string
	$updatedAt: string
}

// Recipes
export type RecipeFields = {
	$recipeId: string
	$title: string
	$description: string
	$author: string
	$category: string[]
	$cuisine: string
	$prepTime: number
	$cookTime: number
	$totalTime: number
	$servings: number
	$difficulty: string
	$ingredients: string[]
	$instructions: string[]
	$nutritionCalories: number
	$nutritionFat: number
	$nutritionCarbs: number
	$nutritionProtein: number
	$allergens: string[]
	$dietaryInfo: string[]
	$equipment: string[]
	$tips: string[]
	$images: string[]
	$video: string
	$rating: number
	$reviewCount: number
	$keywords: string[]
	$season: string
	$occasion: string
	$createdAt: string
	$updatedAt: string
}

// Companies
export type CompanyFields = {
	$companyId: string
	$name: string
	$legalName: string
	$description: string
	$industry: string[]
	$type: string
	$size: string
	$founded: string
	$headquarters: string
	$website: string
	$email: string
	$phone: string
	$address: string
	$city: string
	$state: string
	$country: string
	$postalCode: string
	$logo: string
	$socialMediaLinks: string[]
	$employeeCount: number
	$revenue: number
	$stockSymbol: string
	$stockExchange: string
	$ceo: string
	$founders: string[]
	$mission: string
	$vision: string
	$values: string[]
	$registrationNumber: string
	$taxId: string
	$status: string
	$createdAt: string
	$updatedAt: string
}

// Job Listings
export type JobListingFields = {
	$jobId: string
	$title: string
	$company: string
	$department: string
	$location: string
	$type: string
	$level: string
	$description: string
	$responsibilities: string[]
	$requirements: string[]
	$qualifications: string[]
	$skills: string[]
	$experience: string
	$education: string
	$salary: number
	$salaryRange: string
	$benefits: string[]
	$schedule: string
	$shifts: string[]
	$remoteOption: boolean
	$travelRequired: string
	$applicationDeadline: string
	$startDate: string
	$applicationUrl: string
	$status: string
	$postedDate: string
	$views: number
	$applications: number
	$createdAt: string
	$updatedAt: string
}

// Resumes
export type ResumeFields = {
	$resumeId: string
	$userId: string
	$title: string
	$summary: string
	$firstName: string
	$lastName: string
	$email: string
	$phone: string
	$address: string
	$city: string
	$state: string
	$country: string
	$postalCode: string
	$website: string
	$linkedin: string
	$portfolio: string
	$education: string[]
	$experience: string[]
	$skills: string[]
	$certifications: string[]
	$languages: string[]
	$awards: string[]
	$projects: string[]
	$references: string[]
	$availability: string
	$preferredLocation: string
	$preferredSalary: string
	$visaStatus: string
	$createdAt: string
	$updatedAt: string
}

// Interviews
export type InterviewFields = {
	$interviewId: string
	$jobId: string
	$candidateId: string
	$recruiterId: string
	$type: string
	$status: string
	$date: string
	$startTime: string
	$endTime: string
	$timezone: string
	$location: string
	$platform: string
	$meetingLink: string
	$meetingId: string
	$passcode: string
	$round: number
	$feedback: string
	$rating: number
	$notes: string
	$questions: string[]
	$answers: string[]
	$skillsAssessed: string[]
	$recommendationStatus: string
	$nextSteps: string
	$createdAt: string
	$updatedAt: string
}

// Crypto Currencies (completing from previous section)
export type CryptoCurrencyFields = {
	$cryptoId: string
	$name: string
	$symbol: string
	$currentPrice: number
	$marketCap: number
	$volume24h: number
	$circulatingSupply: number
	$totalSupply: number
	$maxSupply: number
	$allTimeHigh: number
	$allTimeHighDate: string
	$allTimeLow: number
	$allTimeLowDate: string
	$priceChange24h: number
	$priceChangePercentage24h: number
	$marketCapRank: number
	$algorithm: string
	$proofType: string
	$description: string
	$website: string
	$whitepaper: string
	$blockchainPlatform: string
	$blockTime: number
	$hashingAlgorithm: string
	$tradingStatus: string
	$createdAt: string
	$updatedAt: string
}

// Wallets
export type WalletFields = {
	$walletId: string
	$userId: string
	$type: string
	$address: string
	$balance: number
	$currency: string
	$name: string
	$status: string
	$isDefault: boolean
	$publicKey: string
	$network: string
	$lastTransactionDate: string
	$totalReceived: number
	$totalSent: number
	$transactionCount: number
	$securityLevel: string
	$recoveryEmail: string
	$backupStatus: string
	$createdAt: string
	$updatedAt: string
}

// Healthcare Providers
export type HealthcareProviderFields = {
	$providerId: string
	$name: string
	$type: string
	$specialization: string[]
	$license: string
	$licenseExpiry: string
	$education: string[]
	$experience: number
	$languages: string[]
	$address: string
	$city: string
	$state: string
	$country: string
	$postalCode: string
	$phone: string
	$email: string
	$website: string
	$acceptingNewPatients: boolean
	$insuranceAccepted: string[]
	$officeHours: string
	$emergencyContact: string
	$rating: number
	$reviewCount: number
	$availability: string[]
	$teleHealthAvailable: boolean
	$hospitalAffiliations: string[]
	$createdAt: string
	$updatedAt: string
}

// Medicines
export type MedicineFields = {
	$medicineId: string
	$name: string
	$genericName: string
	$brandName: string
	$manufacturer: string
	$category: string
	$type: string
	$form: string
	$strength: string
	$dosage: string
	$usage: string
	$sideEffects: string[]
	$warnings: string[]
	$contraindications: string[]
	$interactions: string[]
	$storage: string
	$price: number
	$currency: string
	$requiresPrescription: boolean
	$isControlled: boolean
	$isGeneric: boolean
	$ndc: string
	$expiryDate: string
	$batchNumber: string
	$inStock: boolean
	$quantity: number
	$createdAt: string
	$updatedAt: string
}

// Hospitals
export type HospitalFields = {
	$hospitalId: string
	$name: string
	$type: string
	$description: string
	$address: string
	$city: string
	$state: string
	$country: string
	$postalCode: string
	$phone: string
	$email: string
	$website: string
	$accreditation: string[]
	$specialties: string[]
	$departments: string[]
	$bedCount: number
	$emergencyServices: boolean
	$traumaLevel: string
	$operatingHours: string
	$insuranceAccepted: string[]
	$facilities: string[]
	$languages: string[]
	$parking: boolean
	$publicTransit: boolean
	$rating: number
	$reviewCount: number
	$images: string[]
	$createdAt: string
	$updatedAt: string
}

// Appointments
export type AppointmentFields = {
	$appointmentId: string
	$patientId: string
	$providerId: string
	$hospitalId: string
	$departmentId: string
	$type: string
	$status: string
	$date: string
	$startTime: string
	$endTime: string
	$duration: number
	$reason: string
	$notes: string
	$symptoms: string[]
	$diagnosis: string[]
	$prescription: string[]
	$followUp: string
	$isTelehealth: boolean
	$meetingLink: string
	$roomNumber: string
	$floor: string
	$insuranceDetails: string
	$paymentStatus: string
	$cancellationReason: string
	$reminderSent: boolean
	$createdAt: string
	$updatedAt: string
}

// Chats
export type ChatFields = {
	$chatId: string
	$type: string
	$participants: string[]
	$name: string
	$lastMessage: string
	$lastMessageTime: string
	$lastMessageSender: string
	$unreadCount: number
	$status: string
	$isGroupChat: boolean
	$groupAdmin: string
	$groupDescription: string
	$groupImage: string
	$messageCount: number
	$pinnedMessages: string[]
	$mutedParticipants: string[]
	$blockedParticipants: string[]
	$settings: string
	$language: string
	$createdBy: string
	$createdAt: string
	$updatedAt: string
}

// Messages
export type MessageFields = {
	$messageId: string
	$chatId: string
	$senderId: string
	$receiverId: string
	$type: string
	$content: string
	$attachments: string[]
	$status: string
	$readAt: string
	$deliveredAt: string
	$isForwarded: boolean
	$forwardedFrom: string
	$replyTo: string
	$mentions: string[]
	$reactions: string[]
	$editHistory: string[]
	$isEdited: boolean
	$isPinned: boolean
	$isStarred: boolean
	$isDeleted: boolean
	$deletedAt: string
	$createdAt: string
	$updatedAt: string
}

// Notifications
export type NotificationFields = {
	$notificationId: string
	$userId: string
	$type: string
	$title: string
	$message: string
	$priority: string
	$status: string
	$action: string
	$actionUrl: string
	$icon: string
	$image: string
	$isRead: boolean
	$readAt: string
	$isArchived: boolean
	$archivedAt: string
	$category: string
	$source: string
	$expiresAt: string
	$metadata: string
	$createdAt: string
	$updatedAt: string
}

// Address
export type AddressFields = {
	$country: string // 'United Kingdom'
	$city: string // 'New Ortiz chester'
	$zip: string // '26995-7979'
	$street: string // 'Jadyn Islands'
	$address: string // '6390 Tremblay Pines Suite 784'
	$address1: string // '8417 Veda Circles'
	$address2: string // 'Suite 648'
	$state: string // 'Michigan'
	$stateAbbr: string // 'CO'
	$latitude: number // 90.0610
	$longitude: number // 180.0778
	$buildingNumber: string // 2413
}

// Text
export type TextFields = {
	$sentence: string // 'Laborum eius porro consequatur.'
	$sentences: string[] // ['Dolorum fuga nobis sit...', 'Laboriosam sapiente.', 'Natus quos ut.']
	$title: string // 'Systematic nobis'
	$text: string // 'Nemo tempore natus non accusamus eos placeat...'
	$description: string // 'Vel et rerum nostrum quia...'
	$shortDescription: string // 'Qui iste similique iusto.'
	$string: string // 'saepe quia molestias voluptates et'
	$word: string // 'voluptatem'
	$words: string[] // ['sed', 'quis', 'ut', 'beatae', 'id', 'adipisci', 'aut']
	$letter: string // 'k'
}

// Internet
export type InternetFields = {
	$ip: string // '21.44.122.149'
	$domain: string // 'darrion.us'
	$url: string // 'germaine.net'
	$email: string // 'Josue.Hessel@claire.us'
	$userAgent: string // 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:34.0)...'
}

// Person
export type PersonFields = {
	$name: string // 'Alberto'
	$username: string // 'Darryl'
	$firstName: string // 'Derek'
	$lastName: string // 'Considine'
	$fullName: string // 'Kadin Torphy'
	$password: string // '(205)580-1350Schumm'
	$namePrefix: string // 'Miss'
	$nameSuffix: string // 'Jr.'
	$companyName: string // 'Cole, Wuckert and Strosin'
	$companySuffix: string // 'Inc'
	$catchPhrase: string // 'Synchronised optimal concept'
	$phone: string // '982-790-2592'
}

// Numbers
export type NumberFields = {
	$random: number // 0.7171590146608651
	$integer: number // 632
	$double: number // -234.12987444
	$arrayOfDigits: number[] // [ 4, 8, 3, 1, 7, 6, 6 ]
	$arrayOfIntegers: number[] // [ -105, -7, -532, -596, -430, -957, -234 ]
	$arrayOfDoubles: number[] // [ -866.3755785673857, -166.62194719538093, ...]
	$coinFlip: boolean // true
}

// Date
export type DateFields = {
	$unixTime: number // 659897901
	$date: string // '2001-07-06'
	$time: string // '03:08:02'
	$century: string // 'IV'
	$amPm: string // 'am'
	$dayOfYear: number // 323
	$dayOfMonth: number // 9
	$dayOfWeek: number // 4
	$monthNumber: number // 9
	$monthName: string // 'March'
	$year: number // 1990
	$timezone: string // 'America/Miquelon'
}

// Misc
export type MiscFields = {
	$countryCode: string // 'ES'
	$languageCode: string // 'ru'
	$locale: string // 'hi_IN'
	$currency: {
		// { symbol: 'R', name: 'South African Rand', symbol_native: 'R', ... }
		symbol: string
		name: string
		symbolNative: string
		decimalDigits: number
		rounding: number
		code: string
		namePlural: string
	}
	$currencyCode: string // 'TRY'
	$currencySymbol: string // 'TL'
	$currencyName: string // 'Turkish Lira'
	$mimeType: string // 'audio/mpeg'
	$fileExtension: string // 'rtf'
	$boolean: boolean // true
	$uuid: string // '2f4dc6ba-bd25-4e66-b369-43a13e0cf150'
}

// Colors
export type ColorFields = {
	$colorName: string // 'DarkOliveGreen'
	$safeColorName: string // 'maroon'
	$rgbHex: string // '#2e4e1f'
	$rgbArray: number[] // [ 194, 193, 166 ]
}

// Chance - Basics
export type BasicFields = {
	bool: boolean
	falsy: any
	character: string
	floating: number
	integer: number
	letter: string
	natural: number
	prime: number
	string: string
}

// Thing
export type ThingFields = {
	animal: string
}

// Mobile
export type MobileFields = {
	androidId: string
	appleToken: string
	bbPin: string // BlackBerry Pin
	wp7Anid: string // Windows Phone 7 ID
	wp8Anid2: string // Windows Phone 8 ID
}

// Web
export type WebFields = {
	avatar: string
	color: string
	company: string
	domain: string
	email: string
	fbid: string // Facebook ID
	googleAnalytics: string // Google Analytics ID
	hashtag: string
	ip: string
	ipv6: string
	klout: string // Klout score
	profession: string
	tld: string // Top-Level Domain
	twitter: string
	url: string
}

// Time
export type TimeFields = {
	ampm: string // 'am' or 'pm'
	date: Date
	hammertime: number // Timestamp in milliseconds
	hour: number
	millisecond: number
	minute: number
	month: number
	second: number
	timestamp: number
	timezone: string
	weekday: string
	year: number
}

// Finance
export type FinanceFields = {
	cc: string // Credit Card Number
	ccType: string // Credit Card Type
	currency: string
	currencyPair: string // e.g., 'USD/EUR'
	dollar: string // Dollar amount as a string
	euro: string // Euro amount as a string
	exp: string // Card Expiration Date
	expMonth: string
	expYear: string
}

// Helpers
export type HelperFields = {
	capitalize: (text: string) => string
	mixin: any
	pad: (num: number, width: number, z?: string) => string
	pick: <T>(arr: T[]) => T
	pickOne: <T>(arr: T[]) => T
	pickSet: <T>(arr: T[], count: number) => T[]
	set: any
	shuffle: <T>(arr: T[]) => T[]
}

// Miscellaneous
export type MiscellaneousFields = {
	coin: 'heads' | 'tails'
	dice: number // Dice roll
	guid: string // Globally Unique Identifier
	hash: string // Random Hash
	hidden: boolean
	n: number // Any integer
	normal: number // Normally-distributed number
	radio: string
	rpg: string // RPG dice roll
	tv: string
	unique: <T>(arr: T[]) => T[]
	weighted: <T>(arr: T[], weights: number[]) => T
}

// Bower
export type BowerFields = {
	bower: string
}

// Faker
export type FakerFields = {
	constructor: Function
	getMetadata: () => any
	seed: (value: number) => void
	setDefaultRefDate: (date: Date) => void
}

// SimpleFaker
export type SimpleFakerFields = {
	constructor: Function
	seed: (value: number) => void
	setDefaultRefDate: (date: Date) => void
}

// Randomizer
export type RandomizerFields = {
	next: () => any
	seed: (value: number) => void
}

// Utilities
export type UtilityFields = {
	mergeLocales: (locales: any[]) => any
}

// Airline
export type AirlineFields = {
	aircraftType: string
	airline: string
	airplane: string
	airport: string
	flightNumber: string
	recordLocator: string
	seat: string
}

// Animal
export type AnimalFields = {
	bear: string
	bird: string
	cat: string
	cetacean: string
	cow: string
	crocodilia: string
	dog: string
	fish: string
	horse: string
	insect: string
	lion: string
	rabbit: string
	rodent: string
	snake: string
	type: string
}

// Commerce
export type CommerceFields = {
	department: string
	isbn: string
	price: string
	product: string
	productAdjective: string
	productDescription: string
	productMaterial: string
	productName: string
}

// Database
export type DatabaseFields = {
	collation: string
	column: string
	engine: string
	mongodbObjectId: string
	type: string
}

// Datatype
export type DatatypeFields = {
	boolean: boolean
}

// Food
export type FoodFields = {
	adjective: string
	description: string
	dish: string
	ethnicCategory: string
	fruit: string
	ingredient: string
	meat: string
	spice: string
	vegetable: string
}

// Git
export type GitFields = {
	branch: string
	commitDate: Date
	commitEntry: string
	commitMessage: string
	commitSha: string
}

// Hacker
export type HackerFields = {
	abbreviation: string
	adjective: string
	ingverb: string
	noun: string
	phrase: string
	verb: string
}

// Image
export type ImageFields = {
	avatar: string
	avatarGitHub: string
	avatarLegacy: string
	dataUri: string
	url: string
	urlLoremFlickr: string
	urlPicsumPhotos: string
	urlPlaceholder: string
}

// Lorem
export type LoremFields = {
	lines: string
	paragraph: string
	paragraphs: string
	sentence: string
	sentences: string
	slug: string
	text: string
	word: string
	words: string[]
}

// Phone
export type PhoneFields = {
	imei: string
	number: string
}

// Science
export type ScienceFields = {
	chemicalElement: string
	unit: string
}

// String
export type StringFields = {
	alpha: string
	alphanumeric: string
	binary: string
	fromCharacters: string
	hexadecimal: string
	nanoid: string
	numeric: string
	octal: string
	sample: string
	symbol: string
	uuid: string
}

// System
export type SystemFields = {
	commonFileExt: string
	commonFileName: string
	commonFileType: string
	cron: string
	directoryPath: string
	fileExt: string
	fileName: string
	filePath: string
	fileType: string
	mimeType: string
	networkInterface: string
	semver: string
}

// Vehicle
export type VehicleFields = {
	bicycle: string
	color: string
	fuel: string
	manufacturer: string
	model: string
	type: string
	vehicle: string
	vin: string
	vrm: string
}

// Word
export type WordFields = {
	adjective: string
	adverb: string
	conjunction: string
	interjection: string
	noun: string
	preposition: string
	sample: string
	verb: string
	words: string[]
}

// QuizApp
export type QuizAppFields = {
	quizId: string
	title: string
	category: string
	difficulty: 'easy' | 'medium' | 'hard'
	totalQuestions: number
	questions: {
		questionId: string
		questionText: string
		options: string[]
		correctAnswer: string
		explanation?: string
	}[]
	timer: number // time in seconds
	creator: {
		userId: string
		username: string
		profilePicture: string
	}
	tags: string[]
	createdDate: Date
	isPublished: boolean
}

// VideoStreamingPlatform
export type VideoStreamingPlatformFields = {
	videoId: string
	title: string
	description: string
	genre: string
	duration: number // duration in seconds
	uploadDate: Date
	views: number
	likes: number
	dislikes: number
	tags: string[]
	videoUrl: string
	thumbnailUrl: string
	subtitles: {
		language: string
		url: string
	}[]
	creator: {
		channelId: string
		channelName: string
		subscribers: number
		profilePicture: string
	}
	recommendedVideos: {
		videoId: string
		title: string
		thumbnailUrl: string
	}[]
	comments: {
		commentId: string
		userId: string
		username: string
		text: string
		date: Date
		likes: number
	}[]
}

// BankingApp
export type BankingAppFields = {
	accountId: string
	accountHolder: {
		userId: string
		name: string
		email: string
		phoneNumber: string
	}
	accountType: 'savings' | 'checking' | 'business'
	balance: number
	currency: string
	transactions: {
		transactionId: string
		type: 'credit' | 'debit' | 'transfer'
		amount: number
		date: Date
		description: string
		recipientAccountId?: string
	}[]
	loanAccounts: {
		loanId: string
		type: 'personal' | 'home' | 'auto'
		principalAmount: number
		interestRate: number
		balance: number
		dueDate: Date
	}[]
	creditCardAccounts: {
		cardId: string
		cardNumber: string
		cardType: 'credit' | 'debit'
		expirationDate: Date
		balance: number
		creditLimit: number
		rewards: number
	}[]
}

// Petroleum Industry
export type PetroleumFields = {
	fieldId: string
	fieldName: string
	location: {
		latitude: number
		longitude: number
	}
	operator: string
	wellCount: number
	productionData: {
		date: Date
		barrelsProduced: number
		naturalGasProduced: number
		waterProduced: number
	}[]
	reservoirs: {
		reservoirId: string
		reservoirName: string
		depth: number
		capacity: number // in barrels
		pressure: number // in psi
	}[]
	pipelineData: {
		pipelineId: string
		startLocation: string
		endLocation: string
		capacity: number
		flowRate: number
		status: 'active' | 'maintenance' | 'inactive'
	}[]
	environmentalImpactReports: {
		reportId: string
		reportDate: Date
		carbonEmissions: number // in metric tons
		methaneEmissions: number // in metric tons
		reportSummary: string
	}[]
}

// E-Learning Platform
export type ELearningPlatformFields = {
	courseId: string
	courseName: string
	instructor: {
		userId: string
		name: string
		profilePicture: string
		bio: string
	}
	duration: number // in hours
	modules: {
		moduleId: string
		moduleName: string
		duration: number // in minutes
		lectures: {
			lectureId: string
			title: string
			videoUrl: string
			resources: {
				resourceType: 'pdf' | 'video' | 'quiz'
				resourceUrl: string
			}[]
		}[]
	}[]
	quizzes: {
		quizId: string
		title: string
		questions: {
			questionId: string
			questionText: string
			options: string[]
			correctAnswer: string
		}[]
	}[]
	reviews: {
		userId: string
		rating: number
		comment: string
		date: Date
	}[]
}

// Ride-Sharing
export type RideSharingFields = {
	rideId: string
	user: {
		userId: string
		name: string
		rating: number
	}
	driver: {
		driverId: string
		name: string
		rating: number
		vehicle: {
			make: string
			model: string
			color: string
			licensePlate: string
		}
	}
	pickupLocation: {
		latitude: number
		longitude: number
		address: string
	}
	dropoffLocation: {
		latitude: number
		longitude: number
		address: string
	}
	fare: {
		baseFare: number
		distanceFare: number
		surgeMultiplier: number
		total: number
	}
	distance: number // in miles or kilometers
	status: 'requested' | 'in-progress' | 'completed' | 'canceled'
	requestTime: Date
	startTime?: Date
	endTime?: Date
}

// Healthcare App
export type HealthcareAppFields = {
	patientId: string
	name: string
	age: number
	gender: 'male' | 'female' | 'other'
	medicalHistory: {
		condition: string
		diagnosisDate: Date
		isChronic: boolean
		notes: string
	}[]
	medications: {
		medicationId: string
		name: string
		dosage: string
		frequency: string
		startDate: Date
		endDate?: Date
	}[]
	appointments: {
		appointmentId: string
		date: Date
		time: string
		doctor: {
			doctorId: string
			name: string
			specialization: string
		}
		reason: string
		notes: string
	}[]
	testResults: {
		testId: string
		testName: string
		date: Date
		result: string
		normalRange: string
		doctorComments: string
	}[]
}

// MarriageWebsite
export type MarriageWebsiteFields = {
	profileId: string
	name: string
	age: number
	gender: 'male' | 'female' | 'other'
	maritalStatus: 'single' | 'divorced' | 'widowed'
	religion: string
	caste: string
	education: string
	occupation: string
	income: number
	location: {
		city: string
		state: string
		country: string
	}
	interests: string[]
	photos: string[]
	bio: string
	preferences: {
		preferredAgeRange: [number, number]
		preferredReligion: string
		preferredCaste: string
		preferredOccupation: string
	}
	createdDate: Date
}

// NetworkCompany
export type NetworkCompanyFields = {
	serviceId: string
	serviceName: string
	type: 'internet' | 'mobile' | 'landline'
	plans: {
		planId: string
		planName: string
		dataLimit: number // in GB
		price: number
		duration: 'monthly' | 'yearly'
	}[]
	coverageArea: {
		country: string
		states: string[]
		cities: string[]
	}
	customerSupport: {
		phone: string
		email: string
		chatAvailable: boolean
	}
	userReviews: {
		reviewId: string
		userId: string
		rating: number // 1 to 5
		comment: string
		date: Date
	}[]
	createdDate: Date
}

// SpaceX
export type SpaceXFields = {
	launchId: string
	missionName: string
	launchDate: Date
	rocket: {
		rocketId: string
		rocketName: string
		type: string // Falcon 9, Falcon Heavy, etc.
	}
	launchSite: {
		siteId: string
		siteName: string
		location: {
			latitude: number
			longitude: number
		}
	}
	payloads: {
		payloadId: string
		payloadType: 'Satellite' | 'Crew Dragon' | 'Cargo'
		massKg: number
		orbit: string
	}[]
	success: boolean
	details: string
}

// Google
export type GoogleFields = {
	userId: string
	email: string
	profile: {
		firstName: string
		lastName: string
		profilePicture: string
	}
	servicesUsed: {
		serviceId: string
		serviceName: string // Gmail, Google Drive, Google Maps, etc.
		subscriptionDate: Date
		lastAccessed: Date
	}[]
	privacySettings: {
		dataSharing: boolean
		personalizedAds: boolean
	}
	createdDate: Date
}

// YouTube
export type YouTubeFields = {
	videoId: string
	title: string
	description: string
	channel: {
		channelId: string
		channelName: string
		subscriberCount: number
		channelLogo: string
	}
	uploadDate: Date
	views: number
	likes: number
	dislikes: number
	comments: {
		commentId: string
		userId: string
		content: string
		likes: number
		timestamp: Date
	}[]
	tags: string[]
	category: string
	duration: number // in seconds
	quality: '360p' | '480p' | '720p' | '1080p' | '4K'
	videoUrl: string
}

// Gaming Platform
export type GamingPlatformFields = {
	gameId: string
	title: string
	genre: string
	platform: string // PC, Console, Mobile
	releaseDate: Date
	developer: {
		developerId: string
		name: string
		website: string
	}
	ratings: {
		criticRating: number
		userRating: number
	}
	reviews: {
		reviewId: string
		userId: string
		content: string
		rating: number
		date: Date
	}[]
	achievements: {
		achievementId: string
		name: string
		description: string
		points: number
	}[]
}

// Travel Agency
export type TravelAgencyFields = {
	tripId: string
	destination: string
	itinerary: {
		day: number
		activities: string[]
		accommodation: string
		mealsIncluded: boolean
	}[]
	cost: number
	duration: number // in days
	customerReviews: {
		reviewId: string
		userId: string
		rating: number
		comment: string
		date: Date
	}[]
	availableDates: Date[]
}

// Job Portal
export type JobPortalFields = {
	jobId: string
	title: string
	company: {
		companyId: string
		name: string
		location: string
	}
	description: string
	requirements: string[]
	benefits: string[]
	salaryRange: {
		min: number
		max: number
	}
	jobType: 'full-time' | 'part-time' | 'contract' | 'internship'
	postedDate: Date
}

// Real Estate Agency
export type RealEstateAgencyFields = {
	listingId: string
	propertyType: 'house' | 'apartment' | 'commercial'
	location: {
		address: string
		city: string
		state: string
		zip: string
	}
	price: number
	size: number // in square feet
	bedrooms: number
	bathrooms: number
	listingAgent: {
		agentId: string
		name: string
		contactInfo: {
			phone: string
			email: string
		}
	}
	images: string[]
	createdDate: Date
}

// StreamingService
export type StreamingServiceFields = {
	showId: string
	title: string
	genre: string
	releaseDate: Date
	seasons: number
	episodes: {
		episodeId: string
		title: string
		duration: number // in minutes
		synopsis: string
		airDate: Date
	}[]
	cast: {
		actorId: string
		name: string
		role: string
	}[]
	ratings: {
		criticRating: number
		audienceRating: number
	}
	trailerUrl: string
}
