export const variantSchema = {
    name: 'variant',
    properties: {
        _id: 'objectId?',
        _key: 'string?',
        _partition_key: 'string',
        adult_content: 'bool?',
        age_bracket: 'int?',
        coarse_language: 'bool?',
        created_at: 'date?',
        immutable: 'variant_immutable',
        isactive: 'bool?',
        modified_at: 'date?',
        mutable: 'variant_mutable',
    },
    primaryKey: '_id',
};

export const variant_immutableSchema = {
    name: 'variant_immutable',
    embedded: true,
    properties: {
        engagement: 'variant_immutable_engagement',
        import_id: 'string?',
        import_inventory_id: 'string?',
        inventory_id: 'objectId?',
        parent_id: 'objectId?',
        sellable: 'variant_immutable_sellable',
    },
};

export const variant_immutable_engagementSchema = {
    name: 'variant_immutable_engagement',
    embedded: true,
    properties: {
        blocked: 'int?',
        clicks: 'int?',
        comments: 'int?',
        feedback: 'int?',
        likes: 'int?',
        muted: 'int?',
        not_interested: 'int?',
        other: 'int?',
        re_posts: 'int?',
        shares: 'int?',
        views: 'int?',
    },
};

export const variant_immutable_sellableSchema = {
    name: 'variant_immutable_sellable',
    embedded: true,
    properties: {
        is_sellable: 'bool?',
        quantity: 'double?',
        sold_as: 'double?',
    },
};

export const variant_mutableSchema = {
    name: 'variant_mutable',
    embedded: true,
    properties: {
        public: 'variant_mutable_public',
        sort_order: 'int?',
        taxable: 'bool?',
    },
};

export const variant_mutable_publicSchema = {
    name: 'variant_mutable_public',
    embedded: true,
    properties: {
        compare_at_price: 'double?',
        identity: 'variant_mutable_public_identity',
        is_condition_shown: 'bool?',
        listprice: 'double?',
        measurements: 'variant_mutable_public_measurements',
        options: 'variant_mutable_public_options[]',
        payment_frequency: 'string?',
        preorder: 'variant_mutable_public_preorder',
        title: 'string?',
    },
};

export const variant_mutable_public_identitySchema = {
    name: 'variant_mutable_public_identity',
    embedded: true,
    properties: {
        barcode: 'string?',
        barcode2: 'string?',
        image: 'variant_mutable_public_identity_image',
        import_image_id: 'string?',
        sku: 'string?',
        upc: 'string?',
    },
};

export const variant_mutable_public_identity_imageSchema = {
    name: 'variant_mutable_public_identity_image',
    embedded: true,
    properties: {
        format: 'string?',
        height: 'int?',
        image_id: 'string?',
        public_id: 'string?',
        resource_type: 'string?',
        url: 'string?',
        version: 'int?',
        width: 'int?',
    },
};

export const variant_mutable_public_measurementsSchema = {
    name: 'variant_mutable_public_measurements',
    embedded: true,
    properties: {
        breadth: 'double?',
        cubic: 'double?',
        cubic_unit: 'string?',
        height: 'double?',
        weight: 'double?',
        weight_unit: 'string?',
        width: 'double?',
    },
};

export const variant_mutable_public_optionsSchema = {
    name: 'variant_mutable_public_options',
    embedded: true,
    properties: {
        key: 'string?',
        value: 'string?',
    },
};

export const variant_mutable_public_preorderSchema = {
    name: 'variant_mutable_public_preorder',
    embedded: true,
    properties: {
        enabled: 'bool?',
        preorder_message: 'string?',
    },
};

export const tax_rateSchema = {
    name: 'tax_rate',
    properties: {
        _id: 'objectId?',
        _key: 'string?',
        _partition_key: 'string',
        action: 'tax_rate_action',
        condition: 'string?',
        custom_id: 'string?',
        default_tax_rate_id: 'bool?',
        item_id: 'objectId?',
        rules: 'tax_rate_rules[]',
        title: 'string?',
    },
    primaryKey: '_id',
};

export const tax_rate_actionSchema = {
    name: 'tax_rate_action',
    embedded: true,
    properties: {
        rate: 'double?',
        stop_other_rules: 'bool?',
        store_id: 'string?',
    },
};

export const tax_rate_rulesSchema = {
    name: 'tax_rate_rules',
    embedded: true,
    properties: {
        attr: 'string?',
        current_attr_index: 'int?',
        current_cond_index: 'int?',
        operator: 'string?',
        parent: 'int?',
        remote_search: 'string?',
        search_title: 'string?',
        second_value: 'string?',
        show_attr_fields: 'bool?',
        show_cond_fields: 'bool?',
        show_operators: 'bool?',
        show_range_fields: 'bool?',
        source: 'string?',
        value: 'string?',
        value_arr: 'tax_rate_rules_value_arr[]',
        value_lookup: 'string?',
    },
};

export const tax_rate_rules_value_arrSchema = {
    name: 'tax_rate_rules_value_arr',
    embedded: true,
    properties: {
        id: 'string?',
        media: 'string?',
        price: 'double?',
        qty: 'double?',
        title: 'string?',
    },
};

export const storeSchema = {
    name: 'store',
    properties: {
        _id: 'objectId?',
        _key: 'string?',
        _partition_key: 'string',
        accepts_latitude: 'bool?',
        acn: 'string?',
        address: 'string[]',
        age_bracket: 'int?',
        application_fee: 'double?',
        base_currency_code: 'string?',
        base_currency_symbol: 'string?',
        business_id: 'string?',
        business_type: 'string?',
        click_and_collect_message: 'string?',
        connected_account: 'string?',
        contact_person: 'string?',
        country: 'string?',
        country_code: 'string?',
        domain: 'string?',
        email: 'string?',
        favicon: 'string?',
        legal_name: 'string?',
        location: 'store_location',
        loyalty_program_enabled: 'bool?',
        name: 'string?',
        order_prefix: 'string?',
        page_id: 'string?',
        parent_id: 'objectId?',
        phone: 'string?',
        postcode: 'string?',
        processing_time: 'string?',
        rank: 'double?',
        response_time: 'int?',
        shipping_time: 'string?',
        state: 'string?',
        store_currency_code: 'string?',
        store_currency_symbol: 'string?',
        store_to_base_rate: 'int?',
        store_type: 'string?',
        subscription: 'string?',
        suburb: 'string?',
        tax_inclusive: 'bool?',
        timezone: 'string?',
        unit_system: 'string?',
        url: 'string?',
    },
    primaryKey: '_id',
};

export const store_locationSchema = {
    name: 'store_location',
    embedded: true,
    properties: {
        coordinates: 'double[]',
        type: 'string?',
    },
};


export const social_feedbackSchema = {
    name: 'social_feedback',
    properties: {
        _id: 'objectId?',
        _from: 'string?',
        _key: 'string?',
        _partition_key: 'string',
        created_at: 'date?',
        modified_at: 'date?',
        product_id: 'objectId?',
        reaction: 'string?',
    },
    primaryKey: '_id',
};


export const shipping_methodSchema = {
    name: 'shipping_method',
    properties: {
        _id: 'objectId?',
        _key: 'string?',
        _partition_key: 'string',
        access: 'string?',
        action: 'shipping_method_action',
        alert: 'string?',
        condition: 'string?',
        created_at: 'date?',
        modified_at: 'date?',
        rules: 'shipping_method_rules[]',
        sort_order: 'int?',
        store_id: 'objectId?',
        title: 'string?',
        isactive: 'bool?',
    },
    primaryKey: '_id',
};



export const shipping_method_actionSchema = {
    name: 'shipping_method_action',
    embedded: true,
    properties: {
        cost: 'double?',
        disable_others: 'bool?',
        custom_charges: 'string?',
    },
};


export const shipping_method_rulesSchema = {
    name: 'shipping_method_rules',
    embedded: true,
    properties: {
        attr: 'string?',
        current_attr_index: 'int?',
        current_cond_index: 'int?',
        operator: 'string?',
        parent: 'int?',
        remote_search: 'string?',
        search_title: 'string?',
        second_value: 'string?',
        show_attr_fields: 'bool?',
        show_cond_fields: 'bool?',
        show_operators: 'bool?',
        show_range_fields: 'bool?',
        source: 'string?',
        value: 'string?',
        value_arr: 'shipping_method_rules_value_arr[]',
        value_lookup: 'string?',
    },
};

export const shipping_method_rules_value_arrSchema = {
    name: 'shipping_method_rules_value_arr',
    embedded: true,
    properties: {
        id: 'string?',
        media: 'string?',
        price: 'int?',
        product_id: 'objectId?',
        qty: 'int?',
        slug: 'string?',
        title: 'string?',
        variant_id: 'objectId?',
    },
};


export const serviceSchema = {
    name: 'service',
    properties: {
        _id: 'objectId?',
        _key: 'string?',
        _partition_key: 'string',
        parent_id: 'objectId?',
        position: 'int?',
        price: 'int?',
        title: 'string?',
    },
    primaryKey: '_id',
};


export const productSchema = {
    name: 'product',
    properties: {
        _id: 'objectId?',
        _key: 'string?',
        _partition_key: 'string',
        adult_content: 'bool?',
        age_bracket: 'int?',
        available_in: 'objectId[]',
        coarse_language: 'bool?',
        created_at: 'date?',
        immutable: 'product_immutable',
        internal: 'product_internal',
        isactive: 'bool?',
        modified_at: 'date?',
        mutable: 'product_mutable',
        rank: 'double?',
        services: 'service[]',
        shipping_id: 'shipping_method',
    },
    primaryKey: '_id',
};


export const product_immutableSchema = {
    name: 'product_immutable',
    embedded: true,
    properties: {
        engagement: 'product_immutable_engagement',
        import_id: 'string?',
    },
};

export const product_immutable_engagementSchema = {
    name: 'product_immutable_engagement',
    embedded: true,
    properties: {
        blocked: 'int?',
        clicks: 'int?',
        comments: 'int?',
        feedback: 'int?',
        likes: 'int?',
        muted: 'int?',
        not_interested: 'int?',
        other: 'int?',
        re_posts: 'int?',
        shares: 'int?',
        views: 'int?',
    },
};

export const product_internalSchema = {
    name: 'product_internal',
    embedded: true,
    properties: {
        conversion: 'product_internal_conversion',
        demographics: 'product_internal_demographics',
        impression: 'int?',
        rank: 'double?',
        reach: 'product_internal_reach',
        status: 'product_internal_status',
    },
};

export const product_internal_conversionSchema = {
    name: 'product_internal_conversion',
    embedded: true,
    properties: {
        ad_cost: 'double?',
        ad_spent: 'double?',
        added_to_cart: 'double?',
        cost_per_click: 'double?',
        cost_per_view: 'double?',
        removed_at_checkout: 'double?',
        removed_from_cart: 'double?',
        sales: 'double?',
        sold: 'double?',
    },
};

export const product_internal_demographicsSchema = {
    name: 'product_internal_demographics',
    embedded: true,
    properties: {
        age_bracket: 'int?',
        female: 'int?',
        guest: 'int?',
        male: 'int?',
        over_15: 'int?',
        over_21: 'int?',
        over_25: 'int?',
        over_30: 'int?',
        over_40: 'int?',
        over_50: 'int?',
        over_65: 'int?',
        under_15: 'int?',
        unknown_gender: 'int?',
    },
};

export const product_internal_reachSchema = {
    name: 'product_internal_reach',
    embedded: true,
    properties: {
        fans: 'int?',
        non_fans: 'int?',
        organic: 'int?',
        paid: 'int?',
    },
};

export const product_internal_statusSchema = {
    name: 'product_internal_status',
    embedded: true,
    properties: {
        disabled: 'bool?',
        disabled_at: 'string?',
        disabled_reason: 'string?',
        isactive: 'bool?',
        reporter: 'string?',
        reporter_id: 'string?',
        store_id: 'objectId?',
    },
};

export const product_mutableSchema = {
    name: 'product_mutable',
    embedded: true,
    properties: {
        add_width_length_height_manually: 'bool?',
        canonical: 'string?',
        click_and_collect_from: 'objectId[]',
        direct_costs: 'double?',
        max_download: 'int?',
        notify_stock_qty: 'double?',
        public: 'product_mutable_public',
        published_scope: 'string?',
    },
};

export const product_mutable_publicSchema = {
    name: 'product_mutable_public',
    embedded: true,
    properties: {
        availability: 'string?',
        bg: 'product_mutable_public_bg',
        brand: 'string?',
        categories: 'string?',
        charge_tax: 'bool?',
        checkout_btn_text: 'string?',
        checkout_link: 'string?',
        compare_at_price: 'double?',
        components: 'component',
        condition: 'string?',
        content: 'string?',
        dangerous_goods: 'bool?',
        display_tags: 'bool?',
        frequency: 'string?',
        frequency_text: 'string?',
        image: 'product_mutable_public_image',
        is_price_hidden: 'bool?',
        link_type: 'string?',
        linking_page: 'product_mutable_public_linking_page',
        listprice: 'double?',
        marketing_tags: 'string?',
        open_graph: 'product_mutable_public_open_graph',
        options: 'product_mutable_public_options[]',
        price_hidden_label: 'string?',
        requires_shipping: 'bool?',
        restricted_product: 'bool?',
        shipping_handling: 'product_mutable_public_shipping_handling',
        short_description: 'string?',
        show_tabs: 'bool?',
        tabs: 'string?',
        tax_inclusive: 'bool?',
        terms_and_conditions: 'string?',
        title: 'string?',
        use_external_url: 'bool?',
    },
};

export const product_mutable_public_bgSchema = {
    name: 'product_mutable_public_bg',
    embedded: true,
    properties: {
        disable_price_rules: 'bool?',
        discount: 'double?',
        enabled: 'bool?',
        free_shipping: 'bool?',
        max_discount: 'double?',
        max_orders: 'int?',
        price: 'double?',
    },
};

export const product_mutable_public_imageSchema = {
    name: 'product_mutable_public_image',
    embedded: true,
    properties: {
        format: 'string?',
        height: 'int?',
        image_id: 'string?',
        public_id: 'string?',
        resource_type: 'string?',
        url: 'string?',
        version: 'int?',
        width: 'int?',
    },
};

export const product_mutable_public_linking_pageSchema = {
    name: 'product_mutable_public_linking_page',
    embedded: true,
    properties: {
        id: 'string?',
        media: 'string?',
        title: 'string?',
        url: 'string?',
    },
};

export const product_mutable_public_open_graphSchema = {
    name: 'product_mutable_public_open_graph',
    embedded: true,
    properties: {
        description: 'string?',
        image: 'string?',
        image_id: 'string?',
        og_type: 'string?',
        tags: 'string?',
        title: 'string?',
        url: 'string?',
    },
};

export const product_mutable_public_optionsSchema = {
    name: 'product_mutable_public_options',
    embedded: true,
    properties: {
        id: 'string?',
        name: 'string?',
        position: 'int?',
        values: 'string[]',
    },
};

export const product_mutable_public_shipping_handlingSchema = {
    name: 'product_mutable_public_shipping_handling',
    embedded: true,
    properties: {
        processing_time: 'string?',
        shipping_time: 'string?',
    },
};

export const product_seasonalSchema = {
    name: 'product_seasonal',
    properties: {
        _id: 'objectId?',
        _key: 'string?',
        _partition_key: 'string',
        age_bracket: 'int?',
        dates: 'product_seasonal_dates',
        immutable: 'product_seasonal_immutable',
        internal: 'product_seasonal_internal',
        mutable: 'product_seasonal_mutable',
        store_id: 'objectId?',
    },
    primaryKey: '_id',
};

export const product_seasonal_datesSchema = {
    name: 'product_seasonal_dates',
    embedded: true,
    properties: {
        created_at: 'string?',
        history: 'product_seasonal_dates_history[]',
        modified_at: 'string?',
    },
};

export const product_seasonal_dates_historySchema = {
    name: 'product_seasonal_dates_history',
    embedded: true,
    properties: {
        modified_at: 'string?',
        user: 'string?',
    },
};

export const product_seasonal_immutableSchema = {
    name: 'product_seasonal_immutable',
    embedded: true,
    properties: {
        boosted: 'bool?',
        engagement: 'product_seasonal_immutable_engagement',
    },
};

export const product_seasonal_immutable_engagementSchema = {
    name: 'product_seasonal_immutable_engagement',
    embedded: true,
    properties: {
        blocked: 'int?',
        clicks: 'int?',
        comments: 'int?',
        feedback: 'int?',
        likes: 'int?',
        muted: 'int?',
        not_interested: 'int?',
        other: 'int?',
        re_posts: 'int?',
        shares: 'int?',
        views: 'int?',
    },
};

export const product_seasonal_internalSchema = {
    name: 'product_seasonal_internal',
    embedded: true,
    properties: {
        boost: 'product_seasonal_internal_boost',
        conversion: 'product_seasonal_internal_conversion',
        demographics: 'product_seasonal_internal_demographics',
        impression: 'int?',
        rank: 'int?',
        reach: 'product_seasonal_internal_reach',
        status: 'product_seasonal_internal_status',
    },
};

export const product_seasonal_internal_boostSchema = {
    name: 'product_seasonal_internal_boost',
    embedded: true,
    properties: {
        amount: 'int?',
        spend_per_day: 'int?',
        spent: 'int?',
        transaction_id: 'string?',
    },
};

export const product_seasonal_internal_conversionSchema = {
    name: 'product_seasonal_internal_conversion',
    embedded: true,
    properties: {
        ad_cost: 'int?',
        ad_spent: 'int?',
        added_to_cart: 'int?',
        cost_per_click: 'int?',
        cost_per_view: 'int?',
        removed_at_checkout: 'int?',
        removed_from_cart: 'int?',
        sales: 'int?',
        sold: 'int?',
    },
};

export const product_seasonal_internal_demographicsSchema = {
    name: 'product_seasonal_internal_demographics',
    embedded: true,
    properties: {
        age_bracket: 'int?',
        female: 'int?',
        guest: 'int?',
        male: 'int?',
        over_15: 'int?',
        over_21: 'int?',
        over_25: 'int?',
        over_30: 'int?',
        over_40: 'int?',
        over_50: 'int?',
        over_65: 'int?',
        under_15: 'int?',
        unknown_gender: 'int?',
    },
};

export const product_seasonal_internal_reachSchema = {
    name: 'product_seasonal_internal_reach',
    embedded: true,
    properties: {
        fans: 'int?',
        non_fans: 'int?',
        organic: 'int?',
        paid: 'int?',
    },
};

export const product_seasonal_internal_statusSchema = {
    name: 'product_seasonal_internal_status',
    embedded: true,
    properties: {
        disabled: 'bool?',
        isactive: 'bool?',
    },
};

export const product_seasonal_mutableSchema = {
    name: 'product_seasonal_mutable',
    embedded: true,
    properties: {
        age_bracket: 'int?',
        call_for_action_text: 'string?',
        call_for_action_url: 'string?',
        components: 'product_seasonal_mutable_components[]',
        isactive: 'bool?',
        short_description: 'string?',
        tags: 'string?',
        title: 'string?',
    },
};

export const product_seasonal_mutable_componentsSchema = {
    name: 'product_seasonal_mutable_components',
    embedded: true,
    properties: {
        listprice: 'double?',
        media: 'string?',
        product_id: 'string?',
        quantity: 'int?',
        sku: 'string?',
        slug: 'string?',
        sort_order: 'int?',
        title: 'string?',
        variant_id: 'string?',
    },
};

export const product_optionSchema = {
    name: 'product_option',
    properties: {
        _id: 'objectId?',
        _key: 'string?',
        _partition_key: 'string',
        created_at: 'string?',
        import_id: 'string?',
        name: 'string?',
        position: 'int?',
        product_id: 'objectId?',
        values: 'string[]',
    },
    primaryKey: '_id',
};

export const product_gallerySchema = {
    name: 'product_gallery',
    properties: {
        _id: 'objectId?',
        _key: 'string?',
        _partition_key: 'string',
        alt: 'string?',
        created_at: 'date?',
        import_id: 'string?',
        media_type: 'string?',
        modified_at: 'date?',
        options: 'product_gallery_options',
        parent_id: 'objectId?',
        position: 'int?',
        store_id: 'objectId?',
    },
    primaryKey: '_id',
};

export const product_gallery_optionsSchema = {
    name: 'product_gallery_options',
    embedded: true,
    properties: {
        format: 'string?',
        height: 'int?',
        image_id: 'string?',
        public_id: 'string?',
        resource_type: 'string?',
        url: 'string?',
        version: 'int?',
        width: 'int?',
    },
};

export const inventorySchema = {
    name: 'inventory',
    properties: {
        _id: 'objectId?',
        _key: 'string?',
        _partition_key: 'string',
        availability: 'string?',
        available_stock: 'double?',
        backordered: 'double?',
        created_at: 'date?',
        deshelved: 'double?',
        enable_backorder: 'bool?',
        faulty: 'double?',
        import_id: 'string?',
        incoming: 'double?',
        manage_stock: 'bool?',
        max_backordered: 'double?',
        modified_at: 'date?',
        on_transfer: 'double?',
        outgoing: 'double?',
        qty_increments: 'double?',
        requested: 'double?',
        returned: 'double?',
        shipped: 'double?',
        soh: 'double?',
        tax_inclusive: 'bool?',
        tax_rate_id: 'objectId?',
    },
    primaryKey: '_id',
};

export const productedgeSchema = {
    name: 'productedge',
    properties: {
        _id: 'objectId?',
        _key: 'string?',
        _partition_key: 'string',
        adult_content: 'bool?',
        age_bracket: 'int?',
        coarse_language: 'bool?',
        inventory: 'inventory',
        is_parent: 'bool?',
        isactive: 'bool?',
        location: 'productedge_location',
        product: 'product',
        rank: 'double?',
        slug: 'string?',
        sort_order: 'int?',
        store: 'store',
        tags: 'string?',
        variant: 'variant',
    },
    primaryKey: '_id',
};

export const productedge_locationSchema = {
    name: 'productedge_location',
    embedded: true,
    properties: {
        coordinates: 'double[]',
        type: 'string?',
    },
};

export const componentSchema = {
    name: 'component',
    properties: {
        _id: 'objectId?',
        _key: 'string?',
        _partition_key: 'string',
        created_at: 'date?',
        items: 'component_items[]',
        modified_at: 'date?',
        parent_id: 'product',
        qty_editable: 'bool?',
        show_lines: 'bool?',
        show_price: 'bool?',
        slug: 'string?',
    },
    primaryKey: '_id',
};

export const component_itemsSchema = {
    name: 'component_items',
    embedded: true,
    properties: {
        collaborator: 'string?',
        collaborator_icon: 'string?',
        collaborator_id: 'objectId?',
        inventory_id: 'objectId?',
        listprice: 'double?',
        media: 'string?',
        product_id: 'objectId?',
        quantity: 'int?',
        sku: 'string?',
        sort_order: 'int?',
        title: 'string?',
        variant_id: 'objectId?',
    },
};


export const commentSchema = {
    name: 'comment',
    properties: {
        _id: 'objectId?',
        _key: 'string?',
        _partition_key: 'string',
        comment: 'string?',
        commentor: 'comment_commentor',
        created_at: 'date?',
        disabled: 'bool?',
        disabled_at: 'string?',
        disabled_reason: 'string?',
        in_reply_to: 'comment_in_reply_to',
        is_reply: 'bool?',
        likers: 'objectId[]',
        likes: 'int?',
        product: 'objectId?',
        shopper: 'objectId?',
        sort_order: 'int?',
        store: 'objectId?',
    },
    primaryKey: '_id',
};


export const comment_commentorSchema = {
    name: 'comment_commentor',
    embedded: true,
    properties: {
        id: 'string?',
        _from: 'string?',
        _key: 'string?',
        avatar_image: 'string?',
        color: 'string?',
        firstname: 'string?',
        lastname: 'string?',
    }
};



export const comment_in_reply_toSchema = {
    name: 'comment_in_reply_to',
    embedded: true,
    properties: {
        color: 'string?',
        name: 'string?',
        snippet: 'string?',
    },
};



export const campaignSchema = {
    name: 'campaign',
    properties: {
        _id: 'objectId?',
        _key: 'string?',
        _partition_key: 'string',
        adult_content: 'bool?',
        age_bracket: 'int?',
        coarse_language: 'bool?',
        dates: 'campaign_dates',
        immutable: 'campaign_immutable',
        internal: 'campaign_internal',
        isactive: 'bool?',
        mutable: 'campaign_mutable',
        rank: 'double?',
        remaining_balance: 'int?',
        store_id: 'objectId?',
        targeting: 'string?',
        total_paid: 'int?',
    },
    primaryKey: '_id',
};

export const campaign_datesSchema = {
    name: 'campaign_dates',
    embedded: true,
    properties: {
        created_at: 'string?',
        history: 'campaign_dates_history[]',
        modified_at: 'string?',
        publish_start: 'string?',
    },
};

export const campaign_dates_historySchema = {
    name: 'campaign_dates_history',
    embedded: true,
    properties: {
        modified_at: 'string?',
        user: 'string?',
    },
};

export const campaign_immutableSchema = {
    name: 'campaign_immutable',
    embedded: true,
    properties: {
        boosted: 'bool?',
        engagement: 'campaign_immutable_engagement',
    },
};

export const campaign_immutable_engagementSchema = {
    name: 'campaign_immutable_engagement',
    embedded: true,
    properties: {
        blocked: 'int?',
        clicks: 'int?',
        comments: 'int?',
        feedback: 'int?',
        likes: 'int?',
        muted: 'int?',
        not_interested: 'int?',
        other: 'int?',
        re_posts: 'int?',
        shares: 'int?',
        views: 'int?',
    },
};

export const campaign_internalSchema = {
    name: 'campaign_internal',
    embedded: true,
    properties: {
        boost: 'campaign_internal_boost',
        conversion: 'campaign_internal_conversion',
        demographics: 'campaign_internal_demographics',
        impression: 'int?',
        rank: 'double?',
        reach: 'campaign_internal_reach',
        status: 'campaign_internal_status',
        targeting: 'string?',
    },
};

export const campaign_internal_boostSchema = {
    name: 'campaign_internal_boost',
    embedded: true,
    properties: {
        amount: 'int?',
        spend_per_day: 'int?',
        spent: 'int?',
        transaction_id: 'string?',
    },
};

export const campaign_internal_conversionSchema = {
    name: 'campaign_internal_conversion',
    embedded: true,
    properties: {
        ad_cost: 'int?',
        ad_spent: 'int?',
        added_to_cart: 'int?',
        cost_per_click: 'int?',
        cost_per_view: 'int?',
        removed_at_checkout: 'int?',
        removed_from_cart: 'int?',
        sales: 'int?',
        sold: 'int?',
    },
};

export const campaign_internal_demographicsSchema = {
    name: 'campaign_internal_demographics',
    embedded: true,
    properties: {
        age_bracket: 'int?',
        female: 'int?',
        guest: 'int?',
        male: 'int?',
        over_15: 'int?',
        over_21: 'int?',
        over_25: 'int?',
        over_30: 'int?',
        over_40: 'int?',
        over_50: 'int?',
        over_65: 'int?',
        under_15: 'int?',
        unknown_gender: 'int?',
    },
};

export const campaign_internal_reachSchema = {
    name: 'campaign_internal_reach',
    embedded: true,
    properties: {
        fans: 'int?',
        non_fans: 'int?',
        organic: 'int?',
        paid: 'int?',
    },
};

export const campaign_internal_statusSchema = {
    name: 'campaign_internal_status',
    embedded: true,
    properties: {
        disabled: 'bool?',
        isactive: 'bool?',
    },
};

export const campaign_mutableSchema = {
    name: 'campaign_mutable',
    embedded: true,
    properties: {
        ad_format: 'string?',
        bid_amount: 'int?',
        bid_type: 'string?',
        budget_type: 'string?',
        call_for_action_text: 'string?',
        condition: 'string?',
        content: 'string?',
        disable_carousel: 'bool?',
        external_url: 'string?',
        group_id: 'string?',
        hashtag: 'string?',
        image: 'campaign_mutable_image',
        images: 'campaign_mutable_images[]',
        linking_page: 'campaign_mutable_linking_page',
        max_bid_amount: 'int?',
        objective: 'string?',
        payment_id: 'string?',
        preheader: 'string?',
        publisher: 'campaign_mutable_publisher',
        rules: 'campaign_mutable_rules[]',
        schedule_type: 'string?',
        status: 'campaign_mutable_status',
        tags: 'string?',
        title: 'string?',
        url: 'string?',
        use_external_url: 'bool?',
    },
};

export const campaign_mutable_imageSchema = {
    name: 'campaign_mutable_image',
    embedded: true,
    properties: {
        format: 'string?',
        height: 'int?',
        image_id: 'string?',
        public_id: 'string?',
        resource_type: 'string?',
        url: 'string?',
        version: 'int?',
        width: 'int?',
    },
};

export const campaign_mutable_imagesSchema = {
    name: 'campaign_mutable_images',
    embedded: true,
    properties: {
        _key: 'string?',
        alt: 'string?',
        dates: 'campaign_mutable_images_dates',
        media_type: 'string?',
        options: 'campaign_mutable_images_options',
        parent_id: 'string?',
        position: 'int?',
        store_id: 'string?',
    },
};

export const campaign_mutable_images_datesSchema = {
    name: 'campaign_mutable_images_dates',
    embedded: true,
    properties: {
        created_at: 'string?',
        modified_at: 'string?',
    },
};

export const campaign_mutable_images_optionsSchema = {
    name: 'campaign_mutable_images_options',
    embedded: true,
    properties: {
        format: 'string?',
        height: 'int?',
        image_id: 'string?',
        public_id: 'string?',
        resource_type: 'string?',
        url: 'string?',
        version: 'int?',
        width: 'int?',
    },
};

export const campaign_mutable_linking_pageSchema = {
    name: 'campaign_mutable_linking_page',
    embedded: true,
    properties: {
        id: 'string?',
        media: 'string?',
        title: 'string?',
        url: 'string?',
    },
};

export const campaign_mutable_publisherSchema = {
    name: 'campaign_mutable_publisher',
    embedded: true,
    properties: {
        avatar_image: 'string?',
        code: 'string?',
        email: 'string?',
        id: 'string?',
        kind: 'string?',
        name: 'string?',
        phone: 'string?',
    },
};

export const campaign_mutable_rulesSchema = {
    name: 'campaign_mutable_rules',
    embedded: true,
    properties: {
        attr: 'string?',
        current_attr_index: 'int?',
        current_cond_index: 'int?',
        operator: 'string?',
        parent: 'int?',
        remote_search: 'string?',
        search_title: 'string?',
        second_value: 'string?',
        show_attr_fields: 'bool?',
        show_cond_fields: 'bool?',
        show_operators: 'bool?',
        show_range_fields: 'bool?',
        source: 'string?',
        value: 'string?',
        value_lookup: 'string?',
    },
};

export const campaign_mutable_statusSchema = {
    name: 'campaign_mutable_status',
    embedded: true,
    properties: {
        disabled: 'bool?',
        isactive: 'bool?',
    },
};

export const campaign_edgeSchema = {
    name: 'campaign_edge',
    properties: {
        _id: 'objectId?',
        _key: 'string?',
        _partition_key: 'string',
        adult_content: 'bool?',
        age_bracket: 'int?',
        campaign: 'campaign',
        coarse_language: 'bool?',
        end: 'date?',
        isactive: 'bool?',
        location: 'campaign_edge_location',
        objective: 'string?',
        rank: 'double?',
        start: 'date?',
        store: 'store',
        tags: 'string?',
    },
    primaryKey: '_id',
};

export const campaign_edge_locationSchema = {
    name: 'campaign_edge_location',
    embedded: true,
    properties: {
        coordinates: 'double[]',
        type: 'string?',
    },
};

export const hashtagSchema = {
    name: 'hashtag',
    properties: {
        _id: 'objectId?',
        _key: 'string?',
        _partition_key: 'string',
        created_at: 'date?',
        expires: 'date?',
        hashtag: 'string?',
        hashtag_type: 'string?',
        immutable: 'hashtag_immutable',
        internal: 'hashtag_internal',
        isactive: 'bool?',
        links_to: 'string?',
        modified_at: 'date?',
        other_hashtags: 'string?',
        period: 'string?',
        position: 'int?',
        price: 'int?',
        store: 'objectId?',
        tags: 'string?',
        title: 'string?',
    },
    primaryKey: '_id',
};

export const hashtag_immutableSchema = {
    name: 'hashtag_immutable',
    embedded: true,
    properties: {
        boosted: 'bool?',
        engagement: 'hashtag_immutable_engagement',
    },
};

export const hashtag_immutable_engagementSchema = {
    name: 'hashtag_immutable_engagement',
    embedded: true,
    properties: {
        blocked: 'int?',
        clicks: 'int?',
        comments: 'int?',
        feedback: 'int?',
        likes: 'int?',
        muted: 'int?',
        not_interested: 'int?',
        other: 'int?',
        re_posts: 'int?',
        shares: 'int?',
        views: 'int?',
    },
};

export const hashtag_internalSchema = {
    name: 'hashtag_internal',
    embedded: true,
    properties: {
        boost: 'hashtag_internal_boost',
        conversion: 'hashtag_internal_conversion',
        demographics: 'hashtag_internal_demographics',
        impression: 'int?',
        rank: 'double?',
        reach: 'hashtag_internal_reach',
        status: 'hashtag_internal_status',
        targeting: 'string?',
    },
};

export const hashtag_internal_boostSchema = {
    name: 'hashtag_internal_boost',
    embedded: true,
    properties: {
        amount: 'int?',
        spend_per_day: 'int?',
        spent: 'int?',
        transaction_id: 'string?',
    },
};

export const hashtag_internal_conversionSchema = {
    name: 'hashtag_internal_conversion',
    embedded: true,
    properties: {
        ad_cost: 'int?',
        ad_spent: 'int?',
        added_to_cart: 'int?',
        cost_per_click: 'int?',
        cost_per_view: 'int?',
        removed_at_checkout: 'int?',
        removed_from_cart: 'int?',
        sales: 'int?',
        sold: 'int?',
    },
};

export const hashtag_internal_demographicsSchema = {
    name: 'hashtag_internal_demographics',
    embedded: true,
    properties: {
        age_bracket: 'int?',
        female: 'int?',
        guest: 'int?',
        male: 'int?',
        over_15: 'int?',
        over_21: 'int?',
        over_25: 'int?',
        over_30: 'int?',
        over_40: 'int?',
        over_50: 'int?',
        over_65: 'int?',
        under_15: 'int?',
        unknown_gender: 'int?',
    },
};

export const hashtag_internal_reachSchema = {
    name: 'hashtag_internal_reach',
    embedded: true,
    properties: {
        fans: 'int?',
        non_fans: 'int?',
        organic: 'int?',
        paid: 'int?',
    },
};

export const hashtag_internal_statusSchema = {
    name: 'hashtag_internal_status',
    embedded: true,
    properties: {
        disabled: 'bool?',
        isactive: 'bool?',
    },
};

export const addressbookSchema = {
    name: 'addressbook',
    properties: {
        _id: 'objectId?',
        _partition_key: 'string',
        address: 'addressbook_address',
        address_type: 'string?',
        created_at: 'date?',
        is_billing: 'bool?',
        is_default_billing: 'bool?',
        is_default_shipping: 'bool?',
        is_shipping: 'bool?',
        sameas_shipping: 'bool?',
        shopper_id: 'objectId?',
    },
    primaryKey: '_id',
};

export const addressbook_addressSchema = {
    name: 'addressbook_address',
    embedded: true,
    properties: {
        address: 'string[]',
        country: 'string?',
        country_code: 'string?',
        currency: 'string?',
        currency_symbol: 'string?',
        default_delivery_instructions: 'string?',
        location: 'addressbook_address_location',
        phone: 'string?',
        postcode: 'string?',
        receivers_name: 'string?',
        state: 'string?',
        state_code: 'string?',
        suburb: 'string?',
        timezone: 'string?',
    },
};

export const addressbook_address_locationSchema = {
    name: 'addressbook_address_location',
    embedded: true,
    properties: {
        coordinates: 'double[]',
        type: 'string?',
    },
};

export const shopperSchema = {
    name: 'shopper',
    properties: {
        _id: 'objectId?',
        _key: 'string?',
        _partition_key: 'string',
        age_bracket: 'int?',
        allow_adult_content: 'bool?',
        allow_coarse_language: 'bool?',
        avatar_id: 'string?',
        avatar_image: 'string?',
        banned: 'bool?',
        bg_cover: 'string?',
        bg_id: 'string?',
        blacklisted: 'bool?',
        code: 'string?',
        color: 'string?',
        created_at: 'date?',
        currency: 'string?',
        default_background: 'string?',
        default_billing_address: 'addressbook',
        default_shipping_address: 'addressbook',
        dob: 'date?',
        email: 'string?',
        firstname: 'string?',
        lastname: 'string?',
        lead_source: 'string?',
        must_change_password: 'bool?',
        password: 'string?',
        points_available: 'double?',
        points_currency: 'string?',
        points_redeemed: 'double?',
        points_to_date: 'double?',
        remember_me: 'bool?',
        suspended: 'bool?',
        suspended_period: 'int?',
    },
    primaryKey: '_id',
};

export const cartSchema = {
    name: 'cart',
    properties: {
        _id: 'objectId?',
        _key: 'string?',
        _partition_key: 'string',
        campaign_id: 'objectId?',
        contributors: 'cart_contributors[]',
        created_at: 'date?',
        customer: 'cart_customer',
        discount_amount: 'double?',
        discount_pc: 'double?',
        modified_at: 'date?',
        narratives: 'cart_narratives[]',
        payment: 'cart_payment',
        reference: 'string?',
        shipment: 'cart_shipment',
        slug: 'objectId?',
        status: 'string?',
        totals: 'cart_totals',
        trace: 'string[]',
        wishlist_id: 'objectId?',
    },
    primaryKey: '_id',
};

export const cart_contributorsSchema = {
    name: 'cart_contributors',
    embedded: true,
    properties: {
        amount: 'double?',
        due_date: 'date?',
        gift_card: 'double?',
        paid: 'bool?',
        pledger: 'cart_contributors_pledger',
        points: 'double?',
        transaction_id: 'objectId?',
    },
};

export const cart_contributors_pledgerSchema = {
    name: 'cart_contributors_pledger',
    embedded: true,
    properties: {
        avatar: 'string?',
        email: 'string?',
        name: 'string?',
        shopper_id: 'objectId?',
    },
};

export const cart_customerSchema = {
    name: 'cart_customer',
    embedded: true,
    properties: {
        avatar_image: 'string?',
        email: 'string?',
        id: 'objectId?',
        name: 'string?',
        phone: 'string?',
        points_available: 'double?',
        points_currency: 'string?',
        points_redeemed: 'double?',
    },
};

export const cart_narrativesSchema = {
    name: 'cart_narratives',
    embedded: true,
    properties: {
        content: 'string?',
        creator: 'string?',
        nofitied: 'bool?',
        notify_shopper: 'bool?',
        title: 'string?',
    },
};

export const cart_paymentSchema = {
    name: 'cart_payment',
    embedded: true,
    properties: {
        billing: 'cart_payment_billing',
        code: 'string?',
        response: 'cart_payment_response',
        title: 'string?',
    },
};

export const cart_payment_billingSchema = {
    name: 'cart_payment_billing',
    embedded: true,
    properties: {
        address: 'cart_payment_billing_address',
        email: 'string?',
        name: 'string?',
        phone: 'string?',
    },
};

export const cart_payment_billing_addressSchema = {
    name: 'cart_payment_billing_address',
    embedded: true,
    properties: {
        address: 'string[]',
        country: 'string?',
        country_code: 'string?',
        currency: 'string?',
        currency_symbol: 'string?',
        default_delivery_instructions: 'string?',
        location: 'cart_payment_billing_address_location',
        phone: 'string?',
        postcode: 'string?',
        state: 'string?',
        state_code: 'string?',
        suburb: 'string?',
        timezone: 'string?',
    },
};

export const cart_payment_billing_address_locationSchema = {
    name: 'cart_payment_billing_address_location',
    embedded: true,
    properties: {
        coordinates: 'double[]',
        type: 'string?',
    },
};

export const cart_payment_responseSchema = {
    name: 'cart_payment_response',
    embedded: true,
    properties: {
        application_fee_amount: 'double?',
        charged_amount: 'double?',
        currency_code: 'string?',
        merchant_amount: 'double?',
        payer: 'string?',
        sale: 'double?',
        success: 'bool?',
        transaction_id: 'string?',
    },
};

export const cart_shipmentSchema = {
    name: 'cart_shipment',
    embedded: true,
    properties: {
        address: 'cart_shipment_address',
        carrier: 'string?',
        charge: 'double?',
        cost: 'double?',
        custom_charge: 'string?',
        delivery_note: 'string?',
        dispatch_date: 'date?',
        dispatched: 'bool?',
        email: 'string?',
        instructions: 'string?',
        insurance: 'double?',
        name: 'string?',
        phone: 'string?',
        pricing: 'cart_shipment_pricing',
        shopper_notes: 'string?',
        title: 'string?',
        tracking_number: 'string[]',
    },
};

export const cart_shipment_addressSchema = {
    name: 'cart_shipment_address',
    embedded: true,
    properties: {
        address: 'string[]',
        country: 'string?',
        country_code: 'string?',
        currency: 'string?',
        currency_symbol: 'string?',
        default_delivery_instructions: 'string?',
        location: 'cart_shipment_address_location',
        phone: 'string?',
        postcode: 'string?',
        state: 'string?',
        state_code: 'string?',
        suburb: 'string?',
        timezone: 'string?',
    },
};

export const cart_shipment_address_locationSchema = {
    name: 'cart_shipment_address_location',
    embedded: true,
    properties: {
        coordinates: 'double[]',
        type: 'string?',
    },
};

export const cart_shipment_pricingSchema = {
    name: 'cart_shipment_pricing',
    embedded: true,
    properties: {
        base_currency_code: 'string?',
        base_currency_symbol: 'string?',
        base_discount_amount: 'double?',
        base_listprice: 'double?',
        base_listprice_ex_gst: 'double?',
        base_taxtotal: 'double?',
        base_total: 'double?',
        base_unitprice: 'double?',
        base_unitprice_ex_gst: 'double?',
        conversion_rate: 'double?',
        currency_code: 'string?',
        currency_decimal: 'int?',
        currency_symbol: 'string?',
        discount_amount: 'int?',
        discount_pc: 'double?',
        is_sellable: 'bool?',
        listprice: 'double?',
        listprice_ex_gst: 'double?',
        m_discount_amount: 'double?',
        m_taxtotal: 'double?',
        m_total: 'double?',
        m_unitprice: 'double?',
        m_unitprice_ex_gst: 'double?',
        qty: 'double?',
        rks_applied_discount: 'cart_shipment_pricing_rks_applied_discount',
        taxtotal: 'double?',
        total: 'double?',
        unitprice: 'double?',
        unitprice_ex_gst: 'double?',
    },
};

export const cart_shipment_pricing_rks_applied_discountSchema = {
    name: 'cart_shipment_pricing_rks_applied_discount',
    embedded: true,
    properties: {
        description: 'string?',
        redeemed_amount: 'double?',
        subtotal: 'double?',
        tax_rate: 'double?',
        taxtotal: 'double?',
        total: 'double?',
    },
};

export const cart_totalsSchema = {
    name: 'cart_totals',
    embedded: true,
    properties: {
        base_currency_code: 'string?',
        base_currency_symbol: 'string?',
        base_discount_amount: 'double?',
        base_grand_total: 'double?',
        base_shipping_amount: 'double?',
        base_shipping_discount_amount: 'double?',
        base_shipping_ex_tax: 'double?',
        base_shipping_tax_amount: 'double?',
        base_subtotal: 'double?',
        base_subtotal_ex_tax: 'double?',
        base_subtotal_without_discount: 'double?',
        base_tax_amount: 'double?',
        coupon_code: 'string?',
        cubic: 'double?',
        currency_code: 'string?',
        currency_decimal: 'int?',
        currency_symbol: 'string?',
        discount_amount: 'double?',
        discount_pc: 'double?',
        grand_total: 'double?',
        grand_total_without_discount: 'double?',
        m_discount_amount: 'double?',
        m_grand_total: 'double?',
        m_subtotal: 'double?',
        m_subtotal_ex_tax: 'double?',
        m_tax_amount: 'double?',
        rks_applied_discount: 'cart_totals_rks_applied_discount',
        shipping_amount: 'double?',
        shipping_discount_amount: 'double?',
        shipping_ex_tax: 'double?',
        shipping_tax_amount: 'double?',
        subtotal: 'double?',
        subtotal_ex_tax: 'double?',
        subtotal_without_discount: 'double?',
        tax_amount: 'double?',
        weight: 'double?',
    },
};

export const cart_totals_rks_applied_discountSchema = {
    name: 'cart_totals_rks_applied_discount',
    embedded: true,
    properties: {
        description: 'string?',
        redeemed_amount: 'double?',
        subtotal: 'double?',
        tax_rate: 'double?',
        taxtotal: 'double?',
        total: 'double?',
    },
};

export const cart_itemSchema = {
    name: 'cart_item',
    properties: {
        _id: 'objectId?',
        _partition_key: 'string',
        abondoned_order_notify_count: 'int?',
        admin_notification_message: 'string?',
        backord_qty: 'double?',
        coupon_discount_amount: 'double?',
        coupon_discount_pc: 'double?',
        coupon_id: 'objectId?',
        created_at: 'date?',
        customer_notification_message: 'string?',
        discount_reason: 'string?',
        expires: 'date?',
        modified_at: 'date?',
        parent_id: 'objectId?',
        preorder_qty: 'double?',
        price_overridden: 'bool?',
        pricing: 'cart_item_pricing',
        product: 'cart_item_product',
        quantity: 'double?',
        ready_to_checkout: 'bool?',
        shopping_for: 'cart_item_shopping_for',
        sort_order: 'int?',
        status: 'string?',
        store: 'cart_item_store',
    },
    primaryKey: '_id',
};

export const cart_item_pricingSchema = {
    name: 'cart_item_pricing',
    embedded: true,
    properties: {
        applied_tax: 'cart_item_pricing_applied_tax',
        base_currency_code: 'string?',
        base_currency_symbol: 'string?',
        base_discount_amount: 'double?',
        base_listprice: 'double?',
        base_listprice_ex_gst: 'double?',
        base_taxtotal: 'double?',
        base_total: 'double?',
        base_unitprice: 'double?',
        base_unitprice_ex_gst: 'double?',
        conversion_rate: 'double?',
        currency_code: 'string?',
        currency_decimal: 'int?',
        currency_symbol: 'string?',
        discount_amount: 'double?',
        discount_pc: 'double?',
        is_sellable: 'bool?',
        listprice: 'double?',
        listprice_ex_gst: 'double?',
        m_discount_amount: 'double?',
        m_taxtotal: 'double?',
        m_total: 'double?',
        m_unitprice: 'double?',
        m_unitprice_ex_gst: 'double?',
        qty: 'double?',
        rks_applied_discount: 'cart_item_pricing_rks_applied_discount',
        taxtotal: 'double?',
        total: 'double?',
        unitprice: 'double?',
        unitprice_ex_gst: 'double?',
    },
};

export const cart_item_pricing_applied_taxSchema = {
    name: 'cart_item_pricing_applied_tax',
    embedded: true,
    properties: {
        action: 'cart_item_pricing_applied_tax_action',
        condition: 'string?',
        default_tax_rate_id: 'bool?',
        title: 'string?',
    },
};

export const cart_item_pricing_applied_tax_actionSchema = {
    name: 'cart_item_pricing_applied_tax_action',
    embedded: true,
    properties: {
        rate: 'double?',
        stop_other_rules: 'bool?',
    },
};

export const cart_item_pricing_rks_applied_discountSchema = {
    name: 'cart_item_pricing_rks_applied_discount',
    embedded: true,
    properties: {
        description: 'string?',
        redeemed_amount: 'double?',
        subtotal: 'double?',
        tax_rate: 'double?',
        taxtotal: 'double?',
        total: 'double?',
    },
};

export const cart_item_productSchema = {
    name: 'cart_item_product',
    embedded: true,
    properties: {
        age_bracket: 'int?',
        bargain: 'cart_item_product_bargain',
        identity: 'cart_item_product_identity',
        inventory_id: 'objectId?',
        is_price_hidden: 'bool?',
        link_type: 'string?',
        measurements: 'cart_item_product_measurements',
        options: 'cart_item_product_options[]',
        price_hidden_label: 'string?',
        product_id: 'objectId?',
        shipping_handling: 'cart_item_product_shipping_handling',
        slug: 'string?',
        title: 'string?',
        trace: 'string[]',
        variant_id: 'objectId?',
    },
};

export const cart_item_product_bargainSchema = {
    name: 'cart_item_product_bargain',
    embedded: true,
    properties: {
        disable_price_rules: 'bool?',
        enabled: 'bool?',
        free_shipping: 'bool?',
        max_discount: 'double?',
        max_orders: 'int?',
    },
};

export const cart_item_product_identitySchema = {
    name: 'cart_item_product_identity',
    embedded: true,
    properties: {
        barcode: 'string?',
        barcode2: 'string?',
        image: 'cart_item_product_identity_image',
        sku: 'string?',
        upc: 'string?',
    },
};

export const cart_item_product_identity_imageSchema = {
    name: 'cart_item_product_identity_image',
    embedded: true,
    properties: {
        format: 'string?',
        height: 'int?',
        image_id: 'string?',
        public_id: 'string?',
        resource_type: 'string?',
        url: 'string?',
        version: 'int?',
        width: 'int?',
    },
};

export const cart_item_product_measurementsSchema = {
    name: 'cart_item_product_measurements',
    embedded: true,
    properties: {
        breadth: 'double?',
        cubic: 'double?',
        cubic_unit: 'string?',
        height: 'double?',
        weight: 'double?',
        weight_unit: 'string?',
        width: 'double?',
    },
};

export const cart_item_product_optionsSchema = {
    name: 'cart_item_product_options',
    embedded: true,
    properties: {
        key: 'string?',
        value: 'string?',
    },
};

export const cart_item_product_shipping_handlingSchema = {
    name: 'cart_item_product_shipping_handling',
    embedded: true,
    properties: {
        bin_picking_number: 'string?',
        bulky: 'bool?',
        dangerous_goods: 'bool?',
        fixed_cost_shipping_price: 'double?',
        processing_time: 'string?',
        shipping_time: 'string?',
    },
};

export const cart_item_shopping_forSchema = {
    name: 'cart_item_shopping_for',
    embedded: true,
    properties: {
        avatar_image: 'string?',
        custom: 'string?',
        id: 'string?',
        name: 'string?',
    },
};

export const cart_item_storeSchema = {
    name: 'cart_item_store',
    embedded: true,
    properties: {
        accepts_latitude: 'bool?',
        address: 'string[]',
        country: 'string?',
        email: 'string?',
        favicon: 'string?',
        id: 'string?',
        location: 'string?',
        name: 'string?',
        payments: 'cart_item_store_payments[]',
        phone: 'string?',
        processing_time: 'string?',
        shipping_time: 'string?',
        state: 'string?',
        suburb: 'string?',
    },
};

export const cart_item_store_paymentsSchema = {
    name: 'cart_item_store_payments',
    embedded: true,
    properties: {
        amount: 'double?',
        transaction_id: 'string?',
    },
};

export const wishlist_edgeSchema = {
    name: 'wishlist_edge',
    properties: {
        _id: 'objectId?',
        _key: 'string?',
        _partition_key: 'string',
        name: 'string?',
        shopper: 'objectId?',
        wishlist: 'objectId?',
    },
    primaryKey: '_id',
};

export const wishlistSchema = {
    name: 'wishlist',
    properties: {
        _id: 'objectId?',
        _key: 'string?',
        _partition_key: 'string',
        campaign_id: 'objectId?',
        created_at: 'date?',
        customer: 'wishlist_customer',
        discount_amount: 'double?',
        discount_pc: 'double?',
        modified_at: 'date?',
        name: 'string?',
        payment: 'wishlist_payment',
        pledges: 'wishlist_pledges[]',
        price_overridden: 'bool?',
        pricing: 'wishlist_pricing',
        product: 'wishlist_product',
        quantity: 'double?',
        reference: 'string?',
        shipment: 'wishlist_shipment',
        status: 'string?',
        token: 'objectId?',
        totals: 'wishlist_totals',
        who_sees_this: 'wishlist_who_sees_this[]',
    },
    primaryKey: '_id',
};

export const wishlist_customerSchema = {
    name: 'wishlist_customer',
    embedded: true,
    properties: {
        avatar_image: 'string?',
        email: 'string?',
        id: 'objectId?',
        name: 'string?',
        phone: 'string?',
        points_available: 'double?',
        points_currency: 'string?',
        points_redeemed: 'double?',
    },
};

export const wishlist_paymentSchema = {
    name: 'wishlist_payment',
    embedded: true,
    properties: {
        billing: 'wishlist_payment_billing',
        code: 'string?',
        response: 'wishlist_payment_response',
        title: 'string?',
    },
};

export const wishlist_payment_billingSchema = {
    name: 'wishlist_payment_billing',
    embedded: true,
    properties: {
        address: 'string[]',
        country: 'string?',
        country_code: 'string?',
        currency: 'string?',
        currency_symbol: 'string?',
        default_delivery_instructions: 'string?',
        location: 'wishlist_payment_billing_location',
        phone: 'string?',
        postcode: 'string?',
        state: 'string?',
        state_code: 'string?',
        suburb: 'string?',
        timezone: 'string?',
    },
};

export const wishlist_payment_billing_locationSchema = {
    name: 'wishlist_payment_billing_location',
    embedded: true,
    properties: {
        coordinates: 'double[]',
        type: 'string?',
    },
};

export const wishlist_payment_responseSchema = {
    name: 'wishlist_payment_response',
    embedded: true,
    properties: {
        application_fee_amount: 'double?',
        charged_amount: 'double?',
        currency_code: 'string?',
        merchant_amount: 'double?',
        payer: 'string?',
        sale: 'double?',
        success: 'bool?',
        transaction_id: 'string?',
    },
};

export const wishlist_pledgesSchema = {
    name: 'wishlist_pledges',
    embedded: true,
    properties: {
        amount: 'double?',
        due_date: 'date?',
        gift_card: 'double?',
        paid: 'bool?',
        pledger: 'wishlist_pledges_pledger',
        points: 'double?',
        transaction_id: 'objectId?',
    },
};

export const wishlist_pledges_pledgerSchema = {
    name: 'wishlist_pledges_pledger',
    embedded: true,
    properties: {
        avatar: 'string?',
        email: 'string?',
        name: 'string?',
        shopper_id: 'objectId?',
    },
};

export const wishlist_pricingSchema = {
    name: 'wishlist_pricing',
    embedded: true,
    properties: {
        applied_tax: 'wishlist_pricing_applied_tax',
        base_currency_code: 'string?',
        base_currency_symbol: 'string?',
        base_discount_amount: 'double?',
        base_listprice: 'double?',
        base_listprice_ex_gst: 'double?',
        base_taxtotal: 'double?',
        base_total: 'double?',
        base_unitprice: 'double?',
        base_unitprice_ex_gst: 'double?',
        conversion_rate: 'double?',
        currency_code: 'string?',
        currency_decimal: 'int?',
        currency_symbol: 'string?',
        discount_amount: 'double?',
        discount_pc: 'double?',
        is_sellable: 'bool?',
        listprice: 'double?',
        listprice_ex_gst: 'double?',
        m_discount_amount: 'double?',
        m_taxtotal: 'double?',
        m_total: 'double?',
        m_unitprice: 'double?',
        m_unitprice_ex_gst: 'double?',
        qty: 'double?',
        rks_applied_discount: 'wishlist_pricing_rks_applied_discount',
        taxtotal: 'double?',
        total: 'double?',
        unitprice: 'double?',
        unitprice_ex_gst: 'double?',
    },
};

export const wishlist_pricing_applied_taxSchema = {
    name: 'wishlist_pricing_applied_tax',
    embedded: true,
    properties: {
        action: 'wishlist_pricing_applied_tax_action',
        condition: 'string?',
        default_tax_rate_id: 'bool?',
        title: 'string?',
    },
};

export const wishlist_pricing_applied_tax_actionSchema = {
    name: 'wishlist_pricing_applied_tax_action',
    embedded: true,
    properties: {
        rate: 'double?',
        stop_other_rules: 'bool?',
    },
};

export const wishlist_pricing_rks_applied_discountSchema = {
    name: 'wishlist_pricing_rks_applied_discount',
    embedded: true,
    properties: {
        description: 'string?',
        redeemed_amount: 'double?',
        subtotal: 'double?',
        tax_rate: 'double?',
        taxtotal: 'double?',
        total: 'double?',
    },
};

export const wishlist_productSchema = {
    name: 'wishlist_product',
    embedded: true,
    properties: {
        age_bracket: 'int?',
        bargain: 'wishlist_product_bargain',
        identity: 'wishlist_product_identity',
        inventory_id: 'objectId?',
        is_price_hidden: 'bool?',
        link_type: 'string?',
        measurements: 'wishlist_product_measurements',
        options: 'wishlist_product_options[]',
        price_hidden_label: 'string?',
        product_id: 'objectId?',
        shipping_handling: 'wishlist_product_shipping_handling',
        slug: 'string?',
        title: 'string?',
        variant_id: 'objectId?',
    },
};

export const wishlist_product_bargainSchema = {
    name: 'wishlist_product_bargain',
    embedded: true,
    properties: {
        disable_price_rules: 'bool?',
        enabled: 'bool?',
        free_shipping: 'bool?',
        max_discount: 'double?',
        max_orders: 'int?',
    },
};

export const wishlist_product_identitySchema = {
    name: 'wishlist_product_identity',
    embedded: true,
    properties: {
        barcode: 'string?',
        barcode2: 'string?',
        image: 'wishlist_product_identity_image',
        sku: 'string?',
        upc: 'string?',
    },
};

export const wishlist_product_identity_imageSchema = {
    name: 'wishlist_product_identity_image',
    embedded: true,
    properties: {
        format: 'string?',
        height: 'int?',
        image_id: 'string?',
        public_id: 'string?',
        resource_type: 'string?',
        url: 'string?',
        version: 'int?',
        width: 'int?',
    },
};

export const wishlist_product_measurementsSchema = {
    name: 'wishlist_product_measurements',
    embedded: true,
    properties: {
        breadth: 'double?',
        cubic: 'double?',
        cubic_unit: 'string?',
        height: 'double?',
        weight: 'double?',
        weight_unit: 'string?',
        width: 'double?',
    },
};

export const wishlist_product_optionsSchema = {
    name: 'wishlist_product_options',
    embedded: true,
    properties: {
        key: 'string?',
        value: 'string?',
    },
};

export const wishlist_product_shipping_handlingSchema = {
    name: 'wishlist_product_shipping_handling',
    embedded: true,
    properties: {
        processing_time: 'string?',
        shipping_time: 'string?',
    },
};

export const wishlist_shipmentSchema = {
    name: 'wishlist_shipment',
    embedded: true,
    properties: {
        address: 'wishlist_shipment_address',
        charge: 'double?',
        cost: 'double?',
        custom_charge: 'string?',
        dispatch_date: 'string?',
        dispatched: 'bool?',
        instructions: 'string?',
        insurance: 'double?',
        pricing: 'wishlist_shipment_pricing',
        shopper_notes: 'string?',
        title: 'string?',
    },
};

export const wishlist_shipment_addressSchema = {
    name: 'wishlist_shipment_address',
    embedded: true,
    properties: {
        address: 'string[]',
        country: 'string?',
        country_code: 'string?',
        currency: 'string?',
        currency_symbol: 'string?',
        default_delivery_instructions: 'string?',
        location: 'wishlist_shipment_address_location',
        phone: 'string?',
        postcode: 'string?',
        state: 'string?',
        state_code: 'string?',
        suburb: 'string?',
        timezone: 'string?',
    },
};

export const wishlist_shipment_address_locationSchema = {
    name: 'wishlist_shipment_address_location',
    embedded: true,
    properties: {
        coordinates: 'double[]',
        type: 'string?',
    },
};

export const wishlist_shipment_pricingSchema = {
    name: 'wishlist_shipment_pricing',
    embedded: true,
    properties: {
        base_currency_code: 'string?',
        base_currency_symbol: 'string?',
        base_discount_amount: 'double?',
        base_listprice: 'double?',
        base_listprice_ex_gst: 'double?',
        base_taxtotal: 'double?',
        base_total: 'double?',
        base_unitprice: 'double?',
        base_unitprice_ex_gst: 'double?',
        conversion_rate: 'double?',
        currency_code: 'string?',
        currency_symbol: 'string?',
        discount_amount: 'double?',
        discount_pc: 'double?',
        is_sellable: 'bool?',
        listprice: 'double?',
        listprice_ex_gst: 'double?',
        m_discount_amount: 'double?',
        m_taxtotal: 'double?',
        m_total: 'double?',
        m_unitprice: 'double?',
        m_unitprice_ex_gst: 'double?',
        qty: 'double?',
        rks_applied_discount: 'wishlist_shipment_pricing_rks_applied_discount',
        taxtotal: 'double?',
        total: 'double?',
        unitprice: 'double?',
        unitprice_ex_gst: 'double?',
    },
};

export const wishlist_shipment_pricing_rks_applied_discountSchema = {
    name: 'wishlist_shipment_pricing_rks_applied_discount',
    embedded: true,
    properties: {
        description: 'string?',
        redeemed_amount: 'double?',
        subtotal: 'double?',
        tax_rate: 'double?',
        taxtotal: 'double?',
        total: 'double?',
    },
};

export const wishlist_totalsSchema = {
    name: 'wishlist_totals',
    embedded: true,
    properties: {
        base_currency_code: 'string?',
        base_currency_symbol: 'string?',
        base_discount_amount: 'double?',
        base_grand_total: 'double?',
        base_shipping_amount: 'double?',
        base_shipping_discount_amount: 'double?',
        base_shipping_ex_tax: 'double?',
        base_shipping_tax_amount: 'double?',
        base_subtotal: 'double?',
        base_subtotal_ex_tax: 'double?',
        base_subtotal_without_discount: 'double?',
        base_tax_amount: 'double?',
        coupon_code: 'string?',
        cubic: 'double?',
        currency_code: 'string?',
        currency_decimal: 'int?',
        currency_symbol: 'string?',
        discount_amount: 'double?',
        discount_pc: 'double?',
        grand_total: 'double?',
        grand_total_without_discount: 'double?',
        m_discount_amount: 'double?',
        m_grand_total: 'double?',
        m_subtotal: 'double?',
        m_subtotal_ex_tax: 'double?',
        m_tax_amount: 'double?',
        rks_applied_discount: 'wishlist_totals_rks_applied_discount',
        shipping_amount: 'double?',
        shipping_discount_amount: 'double?',
        shipping_ex_tax: 'double?',
        shipping_tax_amount: 'double?',
        subtotal: 'double?',
        subtotal_ex_tax: 'double?',
        subtotal_without_discount: 'double?',
        tax_amount: 'double?',
        weight: 'double?',
    },
};

export const wishlist_totals_rks_applied_discountSchema = {
    name: 'wishlist_totals_rks_applied_discount',
    embedded: true,
    properties: {
        description: 'string?',
        redeemed_amount: 'double?',
        subtotal: 'double?',
        tax_rate: 'double?',
        taxtotal: 'double?',
        total: 'double?',
    },
};

export const wishlist_who_sees_thisSchema = {
    name: 'wishlist_who_sees_this',
    embedded: true,
    properties: {
        avatar: 'string?',
        email: 'string?',
        name: 'string?',
        shopper_id: 'objectId?',
    },
};


export const store_feedbackSchema = {
    name: 'store_feedback',
    properties: {
        _id: 'objectId?',
        _from: 'string?',
        _key: 'string?',
        _partition_key: 'string',
        created_at: 'date?',
        modified_at: 'date?',
        reaction: 'string?',
        store_id: 'objectId?',
    },
    primaryKey: '_id',
};


export const campaign_feedbackSchema = {
    name: 'campaign_feedback',
    properties: {
        _id: 'objectId?',
        _from: 'string?',
        _key: 'string?',
        _partition_key: 'string',
        campaign_id: 'objectId?',
        created_at: 'date?',
        modified_at: 'date?',
        reaction: 'string?',
    },
    primaryKey: '_id',
};

export const campaign_commentsSchema = {
    name: 'campaign_comments',
    properties: {
        _id: 'objectId?',
        _from: 'string?',
        _key: 'string?',
        _partition_key: 'string',
        campaign_id: 'objectId?',
        comment: 'string?',
        commentor: 'campaign_comments_commentor',
        created_at: 'date?',
        disabled: 'bool?',
        disabled_at: 'string?',
        disabled_reason: 'string?',
        in_reply_to: 'campaign_comments_in_reply_to',
        is_reply: 'bool?',
        likers: 'objectId[]',
        likes: 'int?',
        shopper: 'objectId?',
        sort_order: 'int?',
        store: 'objectId?',
    },
    primaryKey: '_id',
};

export const store_commentsSchema = {
    name: 'store_comments',
    properties: {
        _id: 'objectId?',
        _from: 'string?',
        _key: 'string?',
        _partition_key: 'string',
        comment: 'string?',
        commentor: 'store_comments_commentor',
        created_at: 'date?',
        disabled: 'bool?',
        disabled_at: 'string?',
        disabled_reason: 'string?',
        in_reply_to: 'store_comments_in_reply_to',
        is_reply: 'bool?',
        likers: 'objectId[]',
        likes: 'int?',
        shopper: 'objectId?',
        sort_order: 'int?',
        store: 'objectId?',
        store_id: 'objectId?',
    },
    primaryKey: '_id',
};


export const campaign_comments_commentorSchema = {
    name: 'campaign_comments_commentor',
    embedded: true,
    properties: {
        id: 'string?',
        _from: 'string?',
        _key: 'string?',
        avatar_image: 'string?',
        color: 'string?',
        firstname: 'string?',
        lastname: 'string?',
    }
};


export const campaign_comments_in_reply_toSchema = {
    name: 'campaign_comments_in_reply_to',
    embedded: true,
    properties: {
        color: 'string?',
        name: 'string?',
        snippet: 'string?',
    },
};

export const store_comments_commentorSchema = {
    name: 'store_comments_commentor',
    embedded: true,
    properties: {
        id: 'string?',
        _from: 'string?',
        _key: 'string?',
        avatar_image: 'string?',
        color: 'string?',
        firstname: 'string?',
        lastname: 'string?',
    }
};

export const store_comments_in_reply_toSchema = {
    name: 'store_comments_in_reply_to',
    embedded: true,
    properties: {
        color: 'string?',
        name: 'string?',
        snippet: 'string?',
    },
};


export const campaign_viewsSchema = {
    name: 'campaign_views',
    properties: {
        _id: 'objectId?',
        _key: 'string?',
        _partition_key: 'string',
        country: 'string?',
        created_at: 'date?',
        ip: 'string?',
        item_id: 'objectId?',
        modified_at: 'date?',
        path: 'string?',
        postcode: 'string?',
        referrer: 'string?',
        state: 'string?',
        suburb: 'string?',
        user_agent: 'string?',
    },
    primaryKey: '_id',
};


export const product_viewsSchema = {
    name: 'product_views',
    properties: {
        _id: 'objectId?',
        _key: 'string?',
        _partition_key: 'string',
        country: 'string?',
        created_at: 'date?',
        ip: 'string?',
        item_id: 'objectId?',
        modified_at: 'date?',
        path: 'string?',
        postcode: 'string?',
        referrer: 'string?',
        state: 'string?',
        suburb: 'string?',
        type: 'string?',
        user_agent: 'string?',
    },
    primaryKey: '_id',
};


export const hashtag_viewsSchema = {
    name: 'hashtag_views',
    properties: {
        _id: 'objectId?',
        _key: 'string?',
        _partition_key: 'string',
        country: 'string?',
        created_at: 'date?',
        ip: 'string?',
        item_id: 'objectId?',
        modified_at: 'date?',
        path: 'string?',
        postcode: 'string?',
        referrer: 'string?',
        state: 'string?',
        suburb: 'string?',
        user_agent: 'string?',
    },
    primaryKey: '_id',
};


export const store_clicksSchema = {
    name: 'store_clicks',
    properties: {
        _id: 'objectId?',
        _key: 'string?',
        _partition_key: 'string',
        country: 'string?',
        created_at: 'date?',
        ip: 'string?',
        item_id: 'objectId?',
        modified_at: 'date?',
        path: 'string?',
        postcode: 'string?',
        referrer: 'string?',
        state: 'string?',
        suburb: 'string?',
        user_agent: 'string?',
    },
    primaryKey: '_id',
};


export const product_clicksSchema = {
    name: 'product_clicks',
    properties: {
        _id: 'objectId?',
        _key: 'string?',
        _partition_key: 'string',
        country: 'string?',
        created_at: 'date?',
        ip: 'string?',
        item_id: 'objectId?',
        modified_at: 'date?',
        path: 'string?',
        postcode: 'string?',
        referrer: 'string?',
        state: 'string?',
        suburb: 'string?',
        user_agent: 'string?',
    },
    primaryKey: '_id',
};


export const hashtag_clicksSchema = {
    name: 'hashtag_clicks',
    properties: {
        _id: 'objectId?',
        _key: 'string?',
        _partition_key: 'string',
        country: 'string?',
        created_at: 'date?',
        ip: 'string?',
        item_id: 'objectId?',
        modified_at: 'date?',
        path: 'string?',
        postcode: 'string?',
        referrer: 'string?',
        state: 'string?',
        suburb: 'string?',
        user_agent: 'string?',
    },
    primaryKey: '_id',
};


export const campaign_clicksSchema = {
    name: 'campaign_clicks',
    properties: {
        _id: 'objectId?',
        _key: 'string?',
        _partition_key: 'string',
        country: 'string?',
        created_at: 'date?',
        ip: 'string?',
        item_id: 'objectId?',
        modified_at: 'date?',
        path: 'string?',
        postcode: 'string?',
        referrer: 'string?',
        state: 'string?',
        suburb: 'string?',
        user_agent: 'string?',
    },
    primaryKey: '_id',
};

